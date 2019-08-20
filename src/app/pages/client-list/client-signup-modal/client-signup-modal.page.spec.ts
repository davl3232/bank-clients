import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSignupModalPage } from './client-signup-modal.page';

describe('ClientSignupModalPage', () => {
  let component: ClientSignupModalPage;
  let fixture: ComponentFixture<ClientSignupModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSignupModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSignupModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
