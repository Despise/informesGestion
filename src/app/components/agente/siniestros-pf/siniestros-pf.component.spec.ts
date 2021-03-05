import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestrosPfComponent } from './siniestros-pf.component';

describe('SiniestrosPfComponent', () => {
  let component: SiniestrosPfComponent;
  let fixture: ComponentFixture<SiniestrosPfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestrosPfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiniestrosPfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
