import { TestBed } from '@angular/core/testing';

import { CobranzasGuard } from './cobranzas.guard';

describe('CobranzasGuard', () => {
  let guard: CobranzasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CobranzasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
