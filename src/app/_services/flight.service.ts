import { Injectable } from '@angular/core';
import {flight} from '../_models/flight.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private configUrl = 'http://localhost:3000/data';
  private flightList: Array<flight> ;
  private temp: Array<flight> ;
  private Airlines: Array<string>;
  private slice:any;
  private flagDptr: boolean;
  private flagRtrn: boolean;
  private selectedItem:number;
  
  constructor(private http: HttpClient) {
      this.flightList=new Array<flight>();
      this.temp=new Array<flight>();
      this.Airlines= new Array<string>();
   }

   public getFlightList():Array<flight>{
     this.fillTemplateList(); // fill  template list for sort and filter//Here For Reset List
     return this.flightList;
   }

   public getAirlines():Array<string>{
     return JSON.parse(JSON.stringify(this.Airlines));
     
   }
   
   
   public async getData(){ //get data as JSON
    await this.http.get(this.configUrl).toPromise().then(responseData =>{
        //@ts-ignore
        this.fillDataModel(responseData.epower.cards);
        //@ts-ignore
        this.Airlines=responseData.epower.airlineAirportCodes.airline;
      });
  }

  public fillDataModel(data:any):Array<flight>{ //fill the data as Array<flight>

    this.flightList=new Array<flight>();//when click back button reset the lists and then fill them.
    this.temp=new Array<flight>();
    this.Airlines= new Array<string>();
    
    for(var i:number = 0; i<data.length; i++){  //Json To ArrayList
      this.slice=data[i].departure[0];

      //detected connection number.
      if(data[i].departure.length === 1){this.flagDptr=true;}else{this.flagDptr=false;}
      if(data[i].return.length === 1){this.flagRtrn=true;}else{this.flagRtrn=false;}

      this.flightList.push(new flight(//Json To FlightModel
        this.slice.from, 
        (this.flagDptr == true) ? this.slice.to : data[i].departure[1].to ,
        this.slice.departureDateTime,
        (this.flagDptr === true) ? this.slice.arrivalDateTime : data[i].departure[1].arrivalDateTime,
        this.slice.marketingAirlineCode,  
        this.slice.operatingAirlineCode,
        this.slice.flightNumber, 
         this.slice.cabinClassInfo[0].class,
        (this.flagDptr === true) ? '' : this.slice.to , 
        (data[i].departure.length-1),
        (Number(data[i].totalDuration.elapsedTimeInMinutes)-Number(data[i].totalDuration.depTotalMinutes)),
        data[i].totalDuration.depTotalMinutes, 
        data[i].totalDuration.returnTotalMinutes, 
        data[i].price.itinerary.totalFare,

        (this.flagDptr === true) ? '' : this.slice.to,
        (this.flagDptr === true) ? '' : this.slice.arrivalDateTime,
        (this.slice.baggages.quantity +' ' +this.slice.baggages.unit+'/'+this.slice.baggages.type),
        
        (this.flagDptr === true) ? '' : data[i].departure[1].flightNumber,
        (this.flagDptr === true) ? '' : data[i].departure[1].from,
        (this.flagDptr === true) ? '' : data[i].departure[1].departureDateTime,
        (this.flagDptr === true) ? '' : (data[i].departure[1].baggages.quantity +' ' +data[i].departure[1].baggages.unit+'/'+data[i].departure[1].baggages.type),
        (this.flagDptr === true) ? '' : data[i].departure[1].marketingAirlineCode,
        (this.flagDptr === true) ? '' : data[i].departure[1].operatingAirlineCode,

        data[i].return[0].from,
        data[i].return[0].departureDateTime,
        (this.flagRtrn === true) ? '' : data[i].return[0].to,
        (this.flagRtrn === true) ? '' : data[i].return[0].arrivalDateTime,
        data[i].return[0].flightNumber,
        (data[i].return[0].baggages.quantity +' ' +data[i].return[0].baggages.unit+'/'+data[i].return[0].baggages.type),
        data[i].return[0].operatingAirlineCode,
        data[i].return[0].marketingAirlineCode,
        (this.flagRtrn === true) ? '' : data[i].return[1].from,
        (this.flagRtrn === true) ? '' : data[i].return[1].departureDateTime,
        (this.flagRtrn === true) ? data[i].return[0].to : data[i].return[1].to,
        (this.flagRtrn === true) ? data[i].return[0].arrivalDateTime : data[i].return[1].arrivalDateTime,
        (this.flagRtrn === true) ? '' : data[i].return[1].flightNumber,
        (this.flagRtrn === true) ? '' : (data[i].return[1].baggages.quantity +' ' +data[i].return[1].baggages.unit+'/'+data[i].return[1].baggages.type),
        (this.flagRtrn === true) ? '' : data[i].return[1].operatingAirlineCode,
        (this.flagRtrn === true) ? '' : data[i].return[1].marketingAirlineCode,
        data[i].return[0].cabinClassInfo[0].class,
        (Number(data[i].totalDuration.elapsedTimeInMinutes)-Number(data[i].totalDuration.depTotalMinutes)),
        data[i].price.itinerary.item.baseFare,
        data[i].price.itinerary.item.taxFare
        )); 
    }
    console.log(this.flightList);
    this.fillTemplateList(); // fill  template list for sort and filter
    return this.flightList;
  }

  public fillTemplateList(){
    this.temp=JSON.parse(JSON.stringify(this.flightList));
  }

  public sortPrice(): Array<flight>{ //Sorted array by price
    //this.temp=JSON.parse(JSON.stringify(this.flightList));

    this.temp.sort(function(leftSide, rightSide){
        if(leftSide.price < rightSide.price) return -1;
        if(leftSide.price > rightSide.price) return 1;
        return 0;
    });

    return this.temp;
  }

  public sortDuration(): Array<flight>{ //Sorted array by total hour
    //this.temp=JSON.parse(JSON.stringify(this.flightList));
    this.temp.sort(function(leftSide, rightSide){
        if(leftSide.totalHour < rightSide.totalHour) return -1;
        if(leftSide.totalHour > rightSide.totalHour) return 1;
        return 0;
    });

    return this.temp;
  }

  public filterDepartureArrival(minTime1: Date,maxTime1: Date,minTime2: Date,maxTime2: Date):Array<flight>{ //Filter array by departure time
    //this.temp=JSON.parse(JSON.stringify(this.flightList));
    this.temp = this.flightList.filter((item: any) => {
      
      return (new Date(item.departureDate).getHours() > new Date(minTime1).getHours() ||(
             new Date(item.departureDate).getHours() === new Date(minTime1).getHours() &&
             new Date(item.departureDate).getMinutes() >  new Date(minTime1).getMinutes())) &&

             
             (new Date(item.departureDate).getHours() < new Date(maxTime1).getHours() ||(
             new Date(item.departureDate).getHours() === new Date(maxTime1).getHours() &&
             new Date(item.departureDate).getMinutes() <  new Date(maxTime1).getMinutes()) )&&


             (new Date(item.arrivalDate).getHours() > new Date(minTime2).getHours() ||(
              new Date(item.arrivalDate).getHours() === new Date(minTime2).getHours() &&
              new Date(item.arrivalDate).getMinutes() >  new Date(minTime2).getMinutes())) &&
 
              
              (new Date(item.arrivalDate).getHours() < new Date(maxTime2).getHours() ||(
              new Date(item.arrivalDate).getHours() === new Date(maxTime2).getHours() &&
              new Date(item.arrivalDate).getMinutes() <  new Date(maxTime2).getMinutes()) );
  });

    return this.temp;
  }

  public filterAirlinesRemove(airlinesName: string):Array<flight>{ //Filter array by airlines name-Remove
    //this.temp=JSON.parse(JSON.stringify(this.flightList));
    this.temp = this.temp.filter((item: any) => {
      return item.marketingAirlines !== airlinesName;
    });
    return this.temp;
  }

  public filterAirlinesAdd(airlinesName: string):Array<flight>{ //Filter array by airlines name-Add
    //this.temp=JSON.parse(JSON.stringify(this.flightList));
    this.temp=this.temp.concat( this.flightList.filter((item: any) => {
      return item.marketingAirlines === airlinesName;
    }));
    return this.temp;
  }

  public setSelectedItem(itemNumber:number){
    this.selectedItem=itemNumber;
  }

  public getSelectedItem(){
    return this.temp[this.selectedItem];
  }


}
