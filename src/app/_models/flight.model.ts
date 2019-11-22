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
    layoverTime: number;
    totalHour: number;

    price: number;

    //For flight-detail page 
    //tf=transfer
    tfarrivalCity: string;
    tfarrivalDate: Date;
    tfarrivalBaggage: string;

    tfdepartureFlightNum: string;
    tfdepartureCity: string;
    tfdepartureDate: Date;
    tfdepartureBagage: string;
    tfdepartureMarketing: string;
    tfdepartureOperating: string;

    //return flight informations
    //rt=return tf=transfer
    rtdepartureCity: string;
    rtdepartureDate: Date;
    rt_tf_arrivalCity: string;
    rt_tf_arrivalDate: Date;
    rt1flightNumber: string;
    rt1baggage: string;
    rt1operating: string;
    rt1marketing: string;

    rt_tf_departureCity: string;
    rt_tf_departureDate: Date;
    rtarrivalCity: string;
    rtarrivalDate: string;
    rt2flightNumber: string;
    rt2baggage: string;
    rt2operating: string;
    rt2marketing: string;

    rtclassM: string;
    rtLayoverTime: number;
    returnHour: number;

    //for price parts
    total:number;
    tax:number;




    //generated to show hours
    hourDep: string;
    hourArr: string;
    hourTotal: string;
    hourReturn: string;
    hourLayover: string;



    constructor(departureCity: string, arrivalCity: string,
        departureDate: Date, 
        arrivalDate:Date, marketingAirlines: string,
        operatingAirlines: string, 
        flightNumber:string, classM: string,
        airportNameConnect: string,
        connectionCount: number, 
        layoverTime:number, totalHour: number,
        returnHour: number, price: number,
        
        tfarrivalCity: string,
        tfarrivalDate: Date,
        tfarrivalBaggage: string,
        tfdepartureFlightNum: string,
        tfdepartureCity: string,
        tfdepartureDate: Date,
        tfdepartureBagage: string,
        tfdepartureMarketing: string,
        tfdepartureOperating: string,

        rtdepartureCity: string,
        rtdepartureDate: Date,
        rt_tf_arrivalCity: string,
        rt_tf_arrivalDate: Date,
        rt1flightNumber: string,
        rt1baggage: string,
        rt1operating: string,
        rt1marketing: string,

        rt_tf_departureCity: string,
        rt_tf_departureDate: Date,
        rtarrivalCity: string,
        rtarrivalDate: string,
        rt2flightNumber: string,
        rt2baggage: string,
        rt2operating: string,
        rt2marketing: string,

        rtclassM: string,
        rtLayoverTime: number,
        
        total:number,
        tax:number) {

        this.departureCity = departureCity,
            this.arrivalCity = arrivalCity,
            this.departureDate = departureDate,
            this.arrivalDate = arrivalDate,
            this.marketingAirlines = marketingAirlines,
            this.operatingAirlines = operatingAirlines,
            this.flightNumber = flightNumber,
            this.classM = classM,
            this.airportNameConnect = airportNameConnect,
            this.connectionCount = connectionCount,
            this.layoverTime = layoverTime,
            this.totalHour = totalHour,
            this.returnHour = returnHour,
            this.price = price;

        this.tfarrivalCity = tfarrivalCity;
        this.tfarrivalDate = tfarrivalDate;
        this.tfarrivalBaggage = tfarrivalBaggage;
        this.tfdepartureFlightNum = tfdepartureFlightNum;
        this.tfdepartureCity = tfdepartureCity;
        this.tfdepartureDate = tfdepartureDate;
        this.tfdepartureBagage = tfdepartureBagage;
        this.tfdepartureMarketing = tfdepartureMarketing;
        this.tfdepartureOperating = tfdepartureOperating;

        this.rtdepartureCity=rtdepartureCity;
        this.rtdepartureDate=rtdepartureDate;
        this.rt_tf_arrivalCity=rt_tf_arrivalCity;
        this.rt_tf_arrivalDate=rt_tf_arrivalDate;
        this.rt1flightNumber=rt1flightNumber;
        this.rt1baggage=rt1baggage;
        this.rt1operating=rt1operating;
        this.rt1marketing=rt1marketing;
        this.rt_tf_departureCity=rt_tf_departureCity;
        this.rt_tf_departureDate=rt_tf_departureDate;
        this.rtarrivalCity=rtarrivalCity;
        this.rtarrivalDate=rtarrivalDate;
        this.rt2flightNumber=rt2flightNumber;
        this.rt2baggage=rt2baggage;
        this.rt2operating=rt2operating;
        this.rt2marketing=rt2marketing;
        this.rtclassM=rtclassM;
        this.rtLayoverTime=rtLayoverTime;

        this.total=total-2;
        this.tax=tax;


        this.hourDep = "" + (this.departureDate).toLocaleString().substr(11, 5);
        this.hourArr = "" + (this.arrivalDate).toLocaleString().substr(11, 5);
        this.hourTotal = "" + Math.floor(this.totalHour / 60);// u can use these as a number.
        this.hourReturn = "" + Math.floor(this.returnHour / 60);
        this.hourLayover = "" + Math.floor(this.layoverTime / 60);
    }

}