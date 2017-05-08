import { IUserCredentials } from '../User-Credentials-Interface/user-credentials-interface';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccountInformation } from '../Account-Information-Interface/account-information-interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'account-creator',
	templateUrl: './account-creator.component.html'
})

// find out why properties have to be instantiated with filler (blank) data before they can be set 
export class AccountCreatorComponent implements OnInit {
	private wasClicked: boolean = false;
	private submittedAccountInfo: AccountInformation;
	private subscription;
	private users;

	private model: AccountInformation = {
					  firstName: '',
					  lastName: '',
				      email: '',
			          password: '',
					  uid: ''
					};

	// constructor(private _postsService: UserCredentialsPostsService) {}
	constructor(private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {}

	ngOnInit() { 

		this.users = this.afDB.list('/users');

		this.afAuth.auth.createUserWithEmailAndPassword('authMade', 'authMade');

		// this.afDB.list('/users')
		// 	.subscribe(response => {
		// 		this.subscription = response;
		// 		console.log(response);
		// 	});
	}

	public submitAccountInfo() {
		// write something here to check that info is valid and required fields are present

		this.submittedAccountInfo = this.model;
		this.wasClicked = true;
	}

	public registerUser() {
		let userInfo = {
						firstName: this.model.firstName,
						lastName: this.model.lastName,
					    email: this.model.email,
						password: this.model.password,
						uid: this.afAuth.auth.currentUser.uid,
					 };
		this.users.push(userInfo);
	}

	private alertUserOfCreatedAccount() {
		alert('Your account has been created')
	}

	private displayProperty(responseArray: FirebaseListObservable<any []>, queryProperty: any) {
		responseArray.forEach(responseObject => {
		console.log(responseObject[queryProperty]);
		});
	}
}
