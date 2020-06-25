import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteOrganismeComponent } from './ajoute-organisme.component';

describe('AjouteOrganismeComponent', () => {
  let component: AjouteOrganismeComponent;
  let fixture: ComponentFixture<AjouteOrganismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteOrganismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
