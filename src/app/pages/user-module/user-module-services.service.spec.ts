import { TestBed } from '@angular/core/testing';

import { UserModuleServicesService } from './user-module-services.service';

describe('UserModuleServicesService', () => {
  let service: UserModuleServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserModuleServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
