import { TestBed } from '@angular/core/testing';

import { MaterialexternoService } from '../materialexterno.service';

describe('MaterialexternoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialexternoService = TestBed.get(MaterialexternoService);
    expect(service).toBeTruthy();
  });
});
