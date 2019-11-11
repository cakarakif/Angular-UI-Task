import { Component, OnInit } from '@angular/core';
import { FlightService } from '../_services/flight.service';
import { flight } from '../_models/flight.model';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  private flightInfo: flight ;
  
  constructor(private service:FlightService) {
    
   }

  ngOnInit() {
    this.flightInfo=this.service.getSelectedItem();
    console.log(this.flightInfo);
  }

}
