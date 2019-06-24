import { TestBed } from '@angular/core/testing';

import { HavenConfigureScenarioService } from './haven-configure-scenario.service';

describe('HavenConfigureScenarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenConfigureScenarioService = TestBed.get(HavenConfigureScenarioService);
    expect(service).toBeTruthy();
  });
});
