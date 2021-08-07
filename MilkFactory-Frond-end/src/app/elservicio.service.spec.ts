import { TestBed } from '@angular/core/testing';

import { ElservicioService } from './elservicio.service';

describe('ElservicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElservicioService = TestBed.get(ElservicioService);
    expect(service).toBeTruthy();
  });
});
