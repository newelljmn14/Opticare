import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-searched-providers',
  templateUrl: './searched-providers.component.html',
  styleUrls: ['./searched-providers.component.css']
})
export class SearchedProvidersComponent implements OnInit {
  @Input() listOfProviders: any[];

  constructor(private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit() {

  }

  registerWithProvider(providerName: string) {
    let currentUserUID = this.afAuth.auth.currentUser.uid;

    this.afDB.list('/authenticated-users/' + currentUserUID + '/registered-providers')
      .push(providerName);
  }

  testFunction() {
    console.log(this.afAuth.auth.currentUser.uid);
  }

}
