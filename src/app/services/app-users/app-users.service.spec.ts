import { TestBed } from '@angular/core/testing';

import { AppUsersService } from './app-users.service';

describe('AppUserService', () => {
  let service: AppUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
