import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { LoginComponent } from './login/login.component';
import { AccountCreatorComponent } from 'app/Account-Creator/account-creator.component';
import { AppointmentSchedulerComponent } from 'app/Appointment-Scheduler/appointment-scheduler.component';
import { UserLandingPageComponent } from 'app/User-Landing-Page/user-landing-page.component';
import { AdminAppointmentSchedulerService } from 'app/Appointment-Scheduler/admin-appointment-scheduler.service';
import { SearchedProvidersComponent } from './searched-providers/searched-providers.component';

const routes: Routes = [
  { path: 'user-landing-page', component: UserLandingPageComponent},
	{ path: 'appointment-scheduler', component: AppointmentSchedulerComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'account-creator', component: AccountCreatorComponent },
  { path: '', redirectTo: '/app-login', pathMatch: 'full' },
  // { path: '*', redirectTo: '/app-login', pathMatch: 'full' }
];

const firebaseConfiguration = {
    apiKey: 'AIzaSyDqEiMZ1TVQs9z36l4Ah8B4r0vW71syo6s',
    authDomain: 'opticare-96be7.firebaseapp.com',
    databaseURL: 'https://opticare-96be7.firebaseio.com',
    projectId: 'opticare-96be7',
    storageBucket: 'opticare-96be7.appspot.com',
    messagingSenderId: '911973969495'
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountCreatorComponent,
    UserLandingPageComponent,
    AppointmentSchedulerComponent,
    SearchedProvidersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfiguration)
  ],
  providers: [AngularFireAuth, AngularFireDatabase, AdminAppointmentSchedulerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
