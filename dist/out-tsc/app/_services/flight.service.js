var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { flight } from '../_models/flight.model';
import { HttpClient } from '@angular/common/http';
var FlightService = /** @class */ (function () {
    function FlightService(http) {
        this.http = http;
        this.configUrl = 'http://localhost:3000/data';
        this.flightList = new Array();
        this.temp = new Array();
        this.Airlines = new Array();
    }
    FlightService.prototype.getFlightList = function () {
        this.fillTemplateList(); // fill  template list for sort and filter//Here For Reset List
        return this.flightList;
    };
    FlightService.prototype.getAirlines = function () {
        return JSON.parse(JSON.stringify(this.Airlines));
    };
    FlightService.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: //get data as JSON
                    return [4 /*yield*/, this.http.get(this.configUrl).toPromise().then(function (responseData) {
                            //@ts-ignore
                            _this.fillDataModel(responseData.epower.cards);
                            //@ts-ignore
                            _this.Airlines = responseData.epower.airlineAirportCodes.airline;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FlightService.prototype.fillDataModel = function (data) {
        this.flightList = new Array(); //when click back button reset the lists and then fill them.
        this.temp = new Array();
        this.Airlines = new Array();
        for (var i = 0; i < data.length; i++) { //Json To ArrayList
            this.slice = data[i].departure[0];
            if (data[i].departure.length === 1) { //detected connection number.
                this.flag = true;
            }
            else {
                this.flag = false;
            }
            this.flightList.push(new flight(//Json To FlightModel
            this.slice.from, (this.flag == true) ? this.slice.to : data[i].departure[1].to, this.slice.departureDateTime, (this.flag == true) ? this.slice.arrivalDateTime : data[i].departure[1].arrivalDateTime, this.slice.marketingAirlineCode, this.slice.operatingAirlineCode, this.slice.flightNumber, this.slice.cabinClassInfo[0].class, (this.flag == true) ? '' : this.slice.to, (data[i].departure.length - 1), (Number(data[i].totalDuration.elapsedTimeInMinutes) - Number(data[i].totalDuration.depTotalMinutes)), data[i].totalDuration.depTotalMinutes, data[i].totalDuration.returnTotalMinutes, data[i].price.itinerary.totalFare));
        }
        this.fillTemplateList(); // fill  template list for sort and filter
        return this.flightList;
    };
    FlightService.prototype.fillTemplateList = function () {
        this.temp = JSON.parse(JSON.stringify(this.flightList));
    };
    FlightService.prototype.sortPrice = function () {
        //this.temp=JSON.parse(JSON.stringify(this.flightList));
        this.temp.sort(function (leftSide, rightSide) {
            if (leftSide.price < rightSide.price)
                return -1;
            if (leftSide.price > rightSide.price)
                return 1;
            return 0;
        });
        return this.temp;
    };
    FlightService.prototype.sortDuration = function () {
        //this.temp=JSON.parse(JSON.stringify(this.flightList));
        this.temp.sort(function (leftSide, rightSide) {
            if (leftSide.totalHour < rightSide.totalHour)
                return -1;
            if (leftSide.totalHour > rightSide.totalHour)
                return 1;
            return 0;
        });
        return this.temp;
    };
    FlightService.prototype.filterDepartureArrival = function (minTime1, maxTime1, minTime2, maxTime2) {
        //this.temp=JSON.parse(JSON.stringify(this.flightList));
        this.temp = this.flightList.filter(function (item) {
            return (new Date(item.departureDate).getHours() > new Date(minTime1).getHours() || (new Date(item.departureDate).getHours() === new Date(minTime1).getHours() &&
                new Date(item.departureDate).getMinutes() > new Date(minTime1).getMinutes())) &&
                (new Date(item.departureDate).getHours() < new Date(maxTime1).getHours() || (new Date(item.departureDate).getHours() === new Date(maxTime1).getHours() &&
                    new Date(item.departureDate).getMinutes() < new Date(maxTime1).getMinutes())) &&
                (new Date(item.arrivalDate).getHours() > new Date(minTime2).getHours() || (new Date(item.arrivalDate).getHours() === new Date(minTime2).getHours() &&
                    new Date(item.arrivalDate).getMinutes() > new Date(minTime2).getMinutes())) &&
                (new Date(item.arrivalDate).getHours() < new Date(maxTime2).getHours() || (new Date(item.arrivalDate).getHours() === new Date(maxTime2).getHours() &&
                    new Date(item.arrivalDate).getMinutes() < new Date(maxTime2).getMinutes()));
        });
        return this.temp;
    };
    FlightService.prototype.filterAirlinesRemove = function (airlinesName) {
        //this.temp=JSON.parse(JSON.stringify(this.flightList));
        this.temp = this.temp.filter(function (item) {
            return item.marketingAirlines !== airlinesName;
        });
        return this.temp;
    };
    FlightService.prototype.filterAirlinesAdd = function (airlinesName) {
        //this.temp=JSON.parse(JSON.stringify(this.flightList));
        this.temp = this.temp.concat(this.flightList.filter(function (item) {
            return item.marketingAirlines === airlinesName;
        }));
        return this.temp;
    };
    FlightService.prototype.setSelectedItem = function (itemNumber) {
        this.selectedItem = itemNumber;
    };
    FlightService.prototype.getSelectedItem = function () {
        return this.flightList[this.selectedItem];
    };
    FlightService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], FlightService);
    return FlightService;
}());
export { FlightService };
//# sourceMappingURL=flight.service.js.map