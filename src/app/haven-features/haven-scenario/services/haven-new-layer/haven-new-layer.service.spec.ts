import { TestBed } from '@angular/core/testing';

import { HavenNewLayerService } from './haven-new-layer.service';

describe('HavenNewLayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenNewLayerService = TestBed.get(HavenNewLayerService);
    expect(service).toBeTruthy();
  });
});
