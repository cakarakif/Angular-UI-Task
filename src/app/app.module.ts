import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { FlightService } from './_services/flight.service';
import { Ng5SliderModule } from 'ng5-slider';
import { FlightComponent } from './flight/flight.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';




// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BrowserModule,
        HttpClientModule,
        Ng5SliderModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        FlightComponent,
        FlightDetailComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe,FlightService,
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }