import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipDocsComponent } from './tip-docs.component';

//REVISAR TAMBIEN EL app.module.ts TAMBIEN HAY QUE MODIFICAR

describe('TipDocsComponent', () => {
  let component: TipDocsComponent;
  let fixture: ComponentFixture<TipDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
