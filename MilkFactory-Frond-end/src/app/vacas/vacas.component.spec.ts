import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacasComponent } from './vacas.component';

describe('VacasComponent', () => {
  let component: VacasComponent;
  let fixture: ComponentFixture<VacasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
