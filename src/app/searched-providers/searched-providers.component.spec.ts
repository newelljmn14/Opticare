import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedProvidersComponent } from './searched-providers.component';

describe('SearchedProvidersComponent', () => {
  let component: SearchedProvidersComponent;
  let fixture: ComponentFixture<SearchedProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
