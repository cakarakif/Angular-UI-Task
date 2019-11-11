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
  private flag: boolean;
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

      if(data[i].departure.length === 1){//detected connection number.
        this.flag=true;
      }else{
        this.flag=false;
      }

      this.flightList.push(new flight(//Json To FlightModel
        this.slice.from, (this.flag == true) ? this.slice.to : data[i].departure[1].to ,
        this.slice.departureDateTime,
        (this.flag == true) ? this.slice.arrivalDateTime : data[i].departure[1].arrivalDateTime,
        this.slice.marketingAirlineCode,  
        this.slice.operatingAirlineCode,
        this.slice.flightNumber, 
         this.slice.cabinClassInfo[0].class,
        (this.flag == true) ? 'No Connected Flights' : this.slice.to , 
        (data[i].departure.length-1),
        (Number(data[i].totalDuration.elapsedTimeInMinutes)-Number(data[i].totalDuration.depTotalMinutes)),
        data[i].totalDuration.depTotalMinutes, 
        data[i].totalDuration.returnTotalMinutes, 
        data[i].price.itinerary.totalFare
      )); 
    }
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
      return new Date(item.departureDate).getHours() >= new Date(minTime1).getHours() &&
             new Date(item.departureDate).getHours() <= new Date(maxTime1).getHours() &&
             new Date(item.departureDate).getTime() >=  new Date(minTime1).getTime()  &&
             new Date(item.departureDate).getTime() <=  new Date(maxTime1).getTime()  &&
             new Date(item.arrivalDate).getHours() >= new Date(minTime2).getHours() &&
             new Date(item.arrivalDate).getHours() <= new Date(maxTime2).getHours() &&
             new Date(item.arrivalDate).getTime() >=  new Date(minTime2).getTime()  &&
             new Date(item.arrivalDate).getTime() <=  new Date(maxTime2).getTime();
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
    return this.flightList[this.selectedItem];
  }


}
