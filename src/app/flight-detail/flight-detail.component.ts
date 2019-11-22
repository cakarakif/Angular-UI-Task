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
  private flagStops: Boolean;
  private flightRulesFirst: Boolean;
  private flightRulesSecond: Boolean;
  
  constructor(private service:FlightService) {
    
   }

  ngOnInit() {
    this.flightInfo=this.service.getSelectedItem();
    this.flagStops=this.service.flagDptr;
    this.flightRulesFirst=false;
    this.flightRulesSecond=false;
  }

  public showflightRulesFirst(){
    this.flightRulesFirst=!this.flightRulesFirst;
  }

  public showflightRulesSecond(){
    this.flightRulesSecond=!this.flightRulesSecond;
  }

}
