var flight = /** @class */ (function () {
    function flight(departureCity, arrivalCity, departureDate, arrivalDate, marketingAirlines, operatingAirlines, flightNumber, classM, airportNameConnect, connectionCount, layoverTime, totalHour, returnHour, price) {
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
        this.hourDep = "" + (this.departureDate).toLocaleString().substr(11, 5);
        this.hourArr = "" + (this.arrivalDate).toLocaleString().substr(11, 5);
        this.hourTotal = "" + Math.floor(this.totalHour / 60); // u can use these as a number.
        this.hourReturn = "" + Math.floor(this.returnHour / 60);
        this.hourLayover = "" + Math.floor(this.layoverTime / 60);
        this.tax = this.price / 10;
        this.service = this.price / 20;
        this.total = this.price - this.tax - this.service;
    }
    return flight;
}());
export { flight };
//# sourceMappingURL=flight.model.js.map