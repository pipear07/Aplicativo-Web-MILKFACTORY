import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesproduccionComponent } from './detallesproduccion.component';

describe('DetallesproduccionComponent', () => {
  let component: DetallesproduccionComponent;
  let fixture: ComponentFixture<DetallesproduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesproduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
