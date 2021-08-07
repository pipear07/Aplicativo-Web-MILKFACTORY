import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeVacaComponent } from './informe-vaca.component';

describe('InformeVacaComponent', () => {
  let component: InformeVacaComponent;
  let fixture: ComponentFixture<InformeVacaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeVacaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeVacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
