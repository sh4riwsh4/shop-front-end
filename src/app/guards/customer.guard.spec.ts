import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customerGuard } from './customer.guard';

describe('customerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => CustomerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
