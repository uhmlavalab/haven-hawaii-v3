import { TestBed } from '@angular/core/testing';

import { HavenConfigureMapService } from './haven-configure-map.service';

describe('HavenConfigureMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenConfigureMapService = TestBed.get(HavenConfigureMapService);
    expect(service).toBeTruthy();
  });
});
