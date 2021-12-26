import { TestBed } from '@angular/core/testing';

import { AdminSideNavService } from './admin-side-nav.service';

describe('AdminSideNavService', () => {
  let service: AdminSideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSideNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
