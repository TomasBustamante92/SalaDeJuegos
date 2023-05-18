import { TestBed } from '@angular/core/testing';

import { SalaDeChatGuard } from './sala-de-chat.guard';

describe('SalaDeChatGuard', () => {
  let guard: SalaDeChatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalaDeChatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
