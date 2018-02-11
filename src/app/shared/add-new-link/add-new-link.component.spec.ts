import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLinkComponent } from './add-new-link.component';

describe('AddNewLinkComponent', () => {
  let component: AddNewLinkComponent;
  let fixture: ComponentFixture<AddNewLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
