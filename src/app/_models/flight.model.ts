import { Time } from '@angular/common';

export class flight {
    departureCity: string;
    arrivalCity: string;
    departureDate: Date;
    arrivalDate: Date;
    marketingAirlines: string;
    operatingAirlines: string;
    flightNumber: string; 
    classM: string;
    airportNameConnect: string;
    connectionCount: number;
    layoverTime: Number;
    totalHour: number;
    returnHour: number;
    price: number;

    //generated to show hours
    hourDep:string;
    hourArr:string;
    hourTotal:string;

    constructor(departureCity: string,arrivalCity: string,
                departureDate: Date,arrivalDate: 
                Date,marketingAirlines: string,
                operatingAirlines: string,flightNumber: 
                string, classM: string,
                airportNameConnect: string,
                connectionCount: number,layoverTime: 
                Number,totalHour: number,
                returnHour: number, price: number){

        this.departureCity=departureCity,
        this.arrivalCity=arrivalCity,
        this.departureDate=departureDate,
        this.arrivalDate=arrivalDate,
        this.marketingAirlines=marketingAirlines,
        this.operatingAirlines=operatingAirlines,
        this.flightNumber=flightNumber, 
        this.classM=classM, 
        this.airportNameConnect=airportNameConnect,
        this.connectionCount=connectionCount,
        this.layoverTime=layoverTime,
        this.totalHour=totalHour,
        this.returnHour=returnHour,
        this.price=price;

        this.hourDep=""+(this.departureDate).toLocaleString().substr(11,5);
        this.hourArr=""+(this.arrivalDate).toLocaleString().substr(11,5);
        this.hourTotal=""+Math.floor(this.totalHour / 60);
    }

}