import { Component, OnInit, HostListener } from '@angular/core';
import { FlightService } from '../_services/flight.service'
import { HttpClient } from '@angular/common/http';
import { flight } from '../_models/flight.model';
import { Options, LabelType } from 'ng5-slider';
import { Router } from '@angular/router';

enum CheckBoxType { all, price, duration, NONE };


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  private flightList: Array<flight>;
  private Airlines: Array<string>;
  
  //listen scroll for item numbers
  private scrollItem: number=10;

  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType=0;

  //time slider part for Departure
  minSliderDep: number = 0;
  maxSliderDep: number = 1439;
  hourDep: string;
  optionsSliderDep: Options = {
    floor: this.minSliderDep,
    ceil: this.maxSliderDep,
    translate: (value: number, label: LabelType): string => {
      this.filterDepartureArrival();

      this.hourDep = (Math.floor((value) / 60)) + ':' + (value % 60);
      return this.hourDep;
    }
  };

  //time slider part for Arrival
  minSliderArr: number = 0;
  maxSliderArr: number = 1439;
  hourArr: string;
  optionsSliderArr: Options = {
    floor: this.minSliderArr,
    ceil: this.maxSliderArr,
    translate: (value: number, label: LabelType): string => {
      this.filterDepartureArrival();

      this.hourArr = (Math.floor((value) / 60)) + ':' + (value % 60);
      return this.hourArr;
    }
  };

  constructor(private http: HttpClient, private service: FlightService, private router: Router) {
  }

  @HostListener("window:scroll", [])
  public onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.scrollItem+=5;
    }
  }

  public listAdderScroll(i:number) : boolean {
    if(this.scrollItem > i)
      return true;
    else
      return false;
 }

  async ngOnInit() {//asyn wait till getting HTTP request is done
    await this.service.getData();
    this.getData();
  }

  public selectCheckBoxSort(targetType: CheckBoxType) {//only one checkbox selected at a time for sort operation.
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }

    if (targetType === 0) {//reset all data list
      this.getData();this.getData();
      this.setCheckboxChecked();
      this.minSliderDep = 0;
      this.maxSliderDep = 1439;
      this.minSliderArr = 0;
      this.maxSliderArr = 1439;
    }
    else if (targetType === 1) {
      this.sortPrice();
    }
    else if (targetType === 2) {
      this.sortDuration();
    }

    this.currentlyChecked = targetType;
  }

  public setCheckboxChecked(): void { //set all airlines checkbox to checked(true) when clicked all list    
    var checkedItems: HTMLInputElement;

    for (let item = 1; item <= 22; item++) {
      checkedItems = (<HTMLInputElement>document.getElementById("" + item)) as HTMLInputElement;

      checkedItems.checked = true;
    }
  }

  public getData() {
    this.flightList =JSON.parse(JSON.stringify(this.service.getFlightList())) ;
    this.getAirlines();
  }

  public getAirlines() {
    if (this.Airlines == null || this.Airlines.length == 0) {
      this.Airlines = this.service.getAirlines();
    }
    else {
      this.Airlines = new Array<string>();
    }

  }


  public sortPrice() {
    this.flightList = JSON.parse(JSON.stringify(this.service.sortPrice()));
  }

  public sortDuration() {
    this.flightList = JSON.parse(JSON.stringify(this.service.sortDuration()));
  }

  public filterDepartureArrival() {
    if (this.flightList != null) {
      var minHour1: number = Math.floor((this.minSliderDep) / 60);
      var minMin1: number = this.minSliderDep % 60;
      var maxHour1: number = Math.floor((this.maxSliderDep) / 60);
      var maxMin1: number = this.maxSliderDep % 60;

      var minHour2: number = Math.floor((this.minSliderArr) / 60);
      var minMin2: number = this.minSliderArr % 60;
      var maxHour2: number = Math.floor((this.maxSliderArr) / 60);
      var maxMin2: number = this.maxSliderArr % 60;

      var minDate1: Date = new Date('2018-02-18T02:00:00');
      minDate1.setHours(minHour1);
      minDate1.setMinutes(minMin1);

      var maxDate1: Date = new Date('2018-02-18T02:00:00');
      maxDate1.setHours(maxHour1);
      maxDate1.setMinutes(maxMin1);

      var minDate2: Date = new Date('2018-02-18T02:00:00');
      minDate2.setHours(minHour2);
      minDate2.setMinutes(minMin2);

      var maxDate2: Date = new Date('2018-02-18T02:00:00');
      maxDate2.setHours(maxHour2);
      maxDate2.setMinutes(maxMin2);


      this.flightList = JSON.parse(JSON.stringify(this.service.filterDepartureArrival(minDate1, maxDate1, minDate2, maxDate2)));

      this.controlCheckBoxAirways(-1);
      this.selectCheckBoxSort(this.currentlyChecked);
    }
  }

  public filterAirlines(airlinesName: string, IsChecked: boolean) {
    if (IsChecked === false) {
      this.flightList = JSON.parse(JSON.stringify(this.service.filterAirlinesRemove(airlinesName)));
    } else {
      this.controlCheckBoxAirways(-1);
      this.flightList = JSON.parse(JSON.stringify(this.service.filterAirlinesAdd(airlinesName)));
      this.filterDepartureArrival();
    }
  }

  public onlyAirlines(itemNumber: number) {
    this.controlCheckBoxAirways(itemNumber);
    this.filterDepartureArrival();
  }

  public controlCheckBoxAirways(itemNumber: number) {//number used for 'only' operation if it's not -1
    //control checkbox for set list
    var checkedItems: HTMLInputElement;

    for (let item = 1; item <= 22; item++) {
      checkedItems = (<HTMLInputElement>document.getElementById("" + item)) as HTMLInputElement;

      if (itemNumber === -1 && checkedItems.checked === false) {
        this.flightList = JSON.parse(JSON.stringify(this.service.filterAirlinesRemove(this.Airlines[item - 1])));
      }
      else if (itemNumber !== -1 && item !== itemNumber) {
        this.flightList = JSON.parse(JSON.stringify(this.service.filterAirlinesRemove(this.Airlines[item - 1])));
        checkedItems.checked = false;
      }
      else if (itemNumber !== -1 && item === itemNumber) {
        checkedItems.checked = true;
      }
    }
  }

  public setSelectedItem(itemNumber: number) {
    this.service.setSelectedItem(itemNumber);
  }

}
