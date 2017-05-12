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
	this.healthcareProviders = this.afDB.list('/healthcare-providers');
	
	this.subscription = this.afDB.list('/healthcare-providers')
		.subscribe(providers => {
			this.listOfProviders = providers;
		});
	}

	public saveProviderToDB(name: any) {
		let formattedName = { name: name };
		this.healthcareProviders.push(formattedName);
	}

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

	public getListOfProviders() {
		this.healthcareProviders.subscribe(responseList => {
			responseList.forEach(responseObject => {
				this.listOfProviders.push(responseObject.name);
			});
			console.log(this.listOfProviders[0]);
		});
	}

}
