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
import { Component, HostListener } from '@angular/core';
import { FlightService } from '../_services/flight.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
var CheckBoxType;
(function (CheckBoxType) {
    CheckBoxType[CheckBoxType["all"] = 0] = "all";
    CheckBoxType[CheckBoxType["price"] = 1] = "price";
    CheckBoxType[CheckBoxType["duration"] = 2] = "duration";
    CheckBoxType[CheckBoxType["NONE"] = 3] = "NONE";
})(CheckBoxType || (CheckBoxType = {}));
;
var FlightComponent = /** @class */ (function () {
    function FlightComponent(http, service, router) {
        var _this = this;
        this.http = http;
        this.service = service;
        this.router = router;
        //listen scroll for item numbers
        this.scrollItem = 10;
        this.check_box_type = CheckBoxType;
        //time slider part for Departure
        this.minSliderDep = 0;
        this.maxSliderDep = 1439;
        this.optionsSliderDep = {
            floor: this.minSliderDep,
            ceil: this.maxSliderDep,
            translate: function (value, label) {
                _this.filterDepartureArrival();
                _this.hourDep = (Math.floor((value) / 60)) + ':' + (value % 60);
                return _this.hourDep;
            }
        };
        //time slider part for Arrival
        this.minSliderArr = 0;
        this.maxSliderArr = 1439;
        this.optionsSliderArr = {
            floor: this.minSliderArr,
            ceil: this.maxSliderArr,
            translate: function (value, label) {
                _this.filterDepartureArrival();
                _this.hourArr = (Math.floor((value) / 60)) + ':' + (value % 60);
                return _this.hourArr;
            }
        };
    }
    FlightComponent.prototype.onScroll = function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.scrollItem += 5;
        }
    };
    FlightComponent.prototype.listAdderScroll = function (i) {
        if (this.scrollItem > i)
            return true;
        else
            return false;
    };
    FlightComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: //asyn wait till getting HTTP request is done
                    return [4 /*yield*/, this.service.getData()];
                    case 1:
                        _a.sent();
                        this.getData();
                        return [2 /*return*/];
                }
            });
        });
    };
    FlightComponent.prototype.selectCheckBoxSort = function (targetType) {
        if (this.currentlyChecked === targetType) {
            this.currentlyChecked = CheckBoxType.NONE;
            return;
        }
        if (targetType === 0) { //reset all data list
            this.getData();
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
    };
    FlightComponent.prototype.setCheckboxChecked = function () {
        var checkedItems;
        for (var item = 1; item <= 22; item++) {
            checkedItems = document.getElementById("" + item);
            checkedItems.checked = true;
        }
    };
    FlightComponent.prototype.getData = function () {
        this.flightList = this.service.getFlightList();
        this.getAirlines();
    };
    FlightComponent.prototype.getAirlines = function () {
        if (this.Airlines == null || this.Airlines.length == 0) {
            this.Airlines = this.service.getAirlines();
        }
        else {
            this.Airlines = new Array();
        }
    };
    FlightComponent.prototype.sortPrice = function () {
        this.flightList = this.service.sortPrice();
    };
    FlightComponent.prototype.sortDuration = function () {
        this.flightList = this.service.sortDuration();
    };
    FlightComponent.prototype.filterDepartureArrival = function () {
        if (this.flightList != null) {
            var minHour1 = Math.floor((this.minSliderDep) / 60);
            var minMin1 = this.minSliderDep % 60;
            var maxHour1 = Math.floor((this.maxSliderDep) / 60);
            var maxMin1 = this.maxSliderDep % 60;
            var minHour2 = Math.floor((this.minSliderArr) / 60);
            var minMin2 = this.minSliderArr % 60;
            var maxHour2 = Math.floor((this.maxSliderArr) / 60);
            var maxMin2 = this.maxSliderArr % 60;
            var minDate1 = new Date('2018-02-18T02:00:00');
            minDate1.setHours(minHour1);
            minDate1.setMinutes(minMin1);
            var maxDate1 = new Date('2018-02-18T02:00:00');
            maxDate1.setHours(maxHour1);
            maxDate1.setMinutes(maxMin1);
            var minDate2 = new Date('2018-02-18T02:00:00');
            minDate2.setHours(minHour2);
            minDate2.setMinutes(minMin2);
            var maxDate2 = new Date('2018-02-18T02:00:00');
            maxDate2.setHours(maxHour2);
            maxDate2.setMinutes(maxMin2);
            this.flightList = this.service.filterDepartureArrival(minDate1, maxDate1, minDate2, maxDate2);
            this.controlCheckBoxAirways(-1);
            this.selectCheckBoxSort(this.currentlyChecked);
        }
    };
    FlightComponent.prototype.filterAirlines = function (airlinesName, IsChecked) {
        if (IsChecked === false) {
            this.flightList = this.service.filterAirlinesRemove(airlinesName);
        }
        else {
            this.controlCheckBoxAirways(-1);
            this.flightList = this.service.filterAirlinesAdd(airlinesName);
            this.filterDepartureArrival();
        }
    };
    FlightComponent.prototype.onlyAirlines = function (itemNumber) {
        this.controlCheckBoxAirways(itemNumber);
        this.filterDepartureArrival();
    };
    FlightComponent.prototype.controlCheckBoxAirways = function (itemNumber) {
        //control checkbox for set list
        var checkedItems;
        for (var item = 1; item <= 22; item++) {
            checkedItems = document.getElementById("" + item);
            if (itemNumber === -1 && checkedItems.checked === false) {
                this.flightList = this.service.filterAirlinesRemove(this.Airlines[item - 1]);
            }
            else if (itemNumber !== -1 && item !== itemNumber) {
                this.flightList = this.service.filterAirlinesRemove(this.Airlines[item - 1]);
                checkedItems.checked = false;
            }
            else if (itemNumber !== -1 && item === itemNumber) {
                checkedItems.checked = true;
            }
        }
    };
    FlightComponent.prototype.setSelectedItem = function (itemNumber) {
        this.service.setSelectedItem(itemNumber);
    };
    __decorate([
        HostListener("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FlightComponent.prototype, "onScroll", null);
    FlightComponent = __decorate([
        Component({
            selector: 'app-flight',
            templateUrl: './flight.component.html',
            styleUrls: ['./flight.component.css']
        }),
        __metadata("design:paramtypes", [HttpClient, FlightService, Router])
    ], FlightComponent);
    return FlightComponent;
}());
export { FlightComponent };
//# sourceMappingURL=flight.component.js.map