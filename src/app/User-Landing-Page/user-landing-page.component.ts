import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css']
})
export class UserLandingPageComponent implements OnInit {
	private siteNameModel = { siteName: '' };
	private healthcareProviders: FirebaseListObservable<any []>;
	private listOfProviders: any[];
	private results: string[];
	subscription;

  constructor(private afDB: AngularFireDatabase) { }

  ngOnInit() {
	this.subscription = this.afDB.list('/healthcare-providers')
		.subscribe(providers => {
			this.listOfProviders = providers;
			// console.log(providers);
		});

	// this.matchSearchWithProvider('S');

	}

	public saveProviderToDB(name: any) {
		this.healthcareProviders.push(name);
	}


	// for(let provider of providersList) {console.log("in html", provider)}
	public matchSearchWithProviders(searchInput: string, providersList) {
		let matchingProviders: string[] = [];
		for(let provider of providersList) {
			let matched = true;
				for(let letterIndex = 0; letterIndex < searchInput.length; letterIndex++) {
					if(searchInput[letterIndex] !== provider['name'][letterIndex]) {
						matched = false;
					}
				}
				if(matched) {
					matchingProviders.push(provider.name);
				}
		}
		this.results = matchingProviders;
	}



	// public matchSearchWithProviders(searchInput: string) {
	// 	let matchingProviders: string[] = [];
	// 	this.healthcareProviders.forEach(providerArray => {
	// 		for(let provider of providerArray) {
	// 			let matched = true;
	// 			for(let letterIndex = 0; letterIndex < searchInput.length; letterIndex++) {
	// 				if(searchInput[letterIndex] !== provider['name'][letterIndex]) {
	// 					matched = false;
	// 				}
	// 			}
	// 			if(matched) {
	// 				matchingProviders.push(provider.name);
	// 			}
	// 		}
	// 	})
	// 	.catch(err => console.log(err));
	// 	this.results = matchingProviders;
	// 	console.log(this.results);
	// }


	public getListOfProviders() {
		this.healthcareProviders.subscribe(responseList => {
			responseList.forEach(responseObject => {
				this.listOfProviders.push(responseObject.name);
			});
			console.log(this.listOfProviders[0]);
		});
	}

}
