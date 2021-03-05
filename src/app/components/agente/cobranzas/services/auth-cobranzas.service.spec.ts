import { TestBed } from '@angular/core/testing';

import { AuthCobranzasService } from './auth-cobranzas.service';

describe('AuthCobranzasService', () => {
  let service: AuthCobranzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCobranzasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
