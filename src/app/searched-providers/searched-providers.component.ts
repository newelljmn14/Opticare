import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-searched-providers',
  templateUrl: './searched-providers.component.html',
  styleUrls: ['./searched-providers.component.css']
})
export class SearchedProvidersComponent implements OnInit {
  @Input() listOfProviders: any[];
  @Input() userObj;
  public currentUserId = this.afAuth.auth.currentUser.uid;
  public userFormsPointer = this.afDB.list('/authenticated-users/' + this.currentUserId + '/required-forms');

  constructor(private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  registerProviderWithUser(providerName: string) {
    let providerDoesNotExist = true;
    let currentUserUID = this.afAuth.auth.currentUser.uid;
    let userProvidersObservable = this.afDB.list('/authenticated-users/' + currentUserUID + '/registered-providers');
    let forLoopFinished = new Subject<boolean>();

    userProvidersObservable.subscribe(registeredProviders => {

      for(let provider of registeredProviders) {
        if(provider.$value === providerName) {
          providerDoesNotExist = false;
        }
      }
      forLoopFinished.next(true);
    });

    forLoopFinished.take(1).subscribe(value => {
      if(value && providerDoesNotExist) {
        userProvidersObservable.push(providerName);
      }
    });
  }
    registerUserWithProvider(provider: any) {
      let currentUserUID = this.afAuth.auth.currentUser.uid;
      let providerKey = provider.$key;
      let registeredPatientsObservable = this.afDB.list('/healthcare-providers/' + providerKey + '/registered-patients');
      let patientExistsInDB = false;

      registeredPatientsObservable.subscribe(patients => {
        for(let patient of patients) {
          if(patient.$value === currentUserUID) {
            patientExistsInDB = true;
          }
        }
      });

      Observable.of(patientExistsInDB).subscribe(value => {
        if(!value) {
          this.afDB.list('/healthcare-providers/' + providerKey + '/registered-patients')
            .push(currentUserUID);
        }
      });


  }

  addToUserForms(provider: any) {
    let providerForms = this.getProviderForms(provider);
    let userFormsObs = this.getUserFormsObs(this.currentUserId)
      .subscribe(userFormObjectsArray => {

        let userFormsArray: string[] = [];
        for (let formsObj of userFormObjectsArray) {
          userFormsArray.push(formsObj.$value);
        }

        for (const index in providerForms) {
          if (!userFormsArray.includes(providerForms[index])) {
            this.userFormsPointer.push(providerForms[index]);
          }
        }
      });
  }

  filterDuplicateForms(userForms: any, providerForms ) {
    for (const index in providerForms) {
      if (!providerForms.includes(userForms[index])) {
        return true;
      }
    }
  }

  getUserFormsObs(currentUserId: any) {
    const userForms = [];
    const requiredFormsObservable = this.afDB.list('/authenticated-users/' + currentUserId + '/required-forms');

    return requiredFormsObservable;
  }

  getProviderForms(provider: any): string[] {
    return provider['required-forms'];
  }
}
