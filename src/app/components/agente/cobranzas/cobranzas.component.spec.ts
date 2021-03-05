import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesCobranzasComponent } from './cobranzas.component';

describe('InformesCobranzasComponent', () => {
  let component: InformesCobranzasComponent;
  let fixture: ComponentFixture<InformesCobranzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesCobranzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesCobranzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
