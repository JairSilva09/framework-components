import { TestBed } from '@angular/core/testing';

import { ExportedService } from './exported.service';

describe('ExportedService', () => {
  let service: ExportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
