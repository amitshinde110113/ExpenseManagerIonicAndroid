import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplesPage } from './peoples.page';

describe('PeoplesPage', () => {
  let component: PeoplesPage;
  let fixture: ComponentFixture<PeoplesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoplesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
