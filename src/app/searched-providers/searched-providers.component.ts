import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
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

  constructor(private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) { 
    // let exists = false;
    // let test = new Observable<any>(observer => {
    //   observer.next('a');
    //   observer.next('b');
    // });

    // test.subscribe(values => {
    //   for(let value of values) {
    //     if('a' === value) {
    //       exists = true;
    //   }
    //   }
    // });

    // Observable.of(exists).subscribe(value => console.log(value));
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
        console.log(providerName);
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
            console.log('should push');
        }
      });


  }

  updateUserForms(provider: any) {
    let currentUserUID = this.afAuth.auth.currentUser.uid;
    let userFormsObservable = this.afDB.list('/authenticated-users/' + currentUserUID + '/required-forms');
    let providerForms = provider['required-forms'];

    for(let form of providerForms) {
      console.log(form);
      userFormsObservable.push(form)
        .catch(err => console.log('pushing error: ', err));
    }
  }

  testFunction() {
    let test = new Observable<string[]>(observer => observer.next(['unus', 'duo']));

    test.forEach(number => {
      console.log(number);
    })
    .then(() => console.log('success'))
    .catch(err => console.log('error:', err));

    // this.afDB.list('healthcare-providers')
    //   .forEach(provider => {
    //     console.log('test', provider)
    //   })
    //   .then(res => console.log('resolved'))
    //   .catch(err => console.log(err));
  }

  otherFunction() {
  }

}
