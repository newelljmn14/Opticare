import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searched-providers',
  templateUrl: './searched-providers.component.html',
  styleUrls: ['./searched-providers.component.css']
})
export class SearchedProvidersComponent implements OnInit {
  @Input() listOfProviders: any[];

  constructor() { }

  ngOnInit() {
  }

}
