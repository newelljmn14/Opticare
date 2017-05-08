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
	private listOfProviders: FirebaseListObservable<any []> = <any>[];
	private results: string[];
	subscription;

  constructor(private afDB: AngularFireDatabase) { }

  ngOnInit() {
	// this.healthcareProviders = this.afDB.list('/healthcare-providers');

	this.afDB.list('/healthcare-providers').subscribe(value => console.log(value));

	// this.matchSearchWithProvider('S');

	// this.healthcareProviders.subscribe(value => {
	// 	console.log('value of subscribe: ', value);

	// });


	}

	public saveProviderToDB(name: any) {
		this.healthcareProviders.push(name);
	}

	public matchSearchWithProvider(searchInput: string) {
		let matchingProviders: string[] = [];
		this.healthcareProviders.forEach(providerArray => {
			for(let provider of providerArray) {
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
		})
		.catch(err => console.log(err));
		this.results = matchingProviders;
		console.log(this.results);
	}


	public getListOfProviders() {
		this.healthcareProviders.subscribe(responseList => {
			responseList.forEach(responseObject => {
				this.listOfProviders.push(responseObject.name);
			});
			console.log(this.listOfProviders[0]);
		});
	}

}
