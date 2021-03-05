import { TestBed } from '@angular/core/testing';

import { SiniestrosGuard } from './siniestros.guard';

describe('SiniestrosGuard', () => {
  let guard: SiniestrosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SiniestrosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
