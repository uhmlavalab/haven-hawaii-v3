import { TestBed } from '@angular/core/testing';

import { HavenNewScenarioService } from './haven-new-scenario.service';

describe('HavenNewScenarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenNewScenarioService = TestBed.get(HavenNewScenarioService);
    expect(service).toBeTruthy();
  });
});
