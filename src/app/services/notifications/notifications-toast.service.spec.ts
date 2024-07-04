import { TestBed } from '@angular/core/testing';

import { NotificationsToastService } from './notifications-toast.service';

describe('NotificationsToastService', () => {
  let service: NotificationsToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
