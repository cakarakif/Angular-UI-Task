import { RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { FlightComponent } from './flight/flight.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { AuthGuard } from './_helpers';
var routes = [
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'flights', component: FlightComponent, canActivate: [AuthGuard] },
    { path: "flights/flight-detail", component: FlightDetailComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'flights' }
];
export var appRoutingModule = RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map