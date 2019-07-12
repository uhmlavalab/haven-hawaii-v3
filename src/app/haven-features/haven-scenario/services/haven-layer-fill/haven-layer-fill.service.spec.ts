import { TestBed } from '@angular/core/testing';

import { HavenLayerFillService } from './haven-layer-fill.service';

describe('HavenLayerFillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenLayerFillService = TestBed.get(HavenLayerFillService);
    expect(service).toBeTruthy();
  });
});
