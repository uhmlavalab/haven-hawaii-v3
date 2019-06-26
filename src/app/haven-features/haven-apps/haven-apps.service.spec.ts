import { TestBed } from '@angular/core/testing';

import { HavenAppsService } from './haven-apps.service';

describe('HavenAppsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenAppsService = TestBed.get(HavenAppsService);
    expect(service).toBeTruthy();
  });
});
