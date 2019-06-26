import { TestBed } from '@angular/core/testing';

import { HavenScenarioListService } from './haven-scenario-list.service';

describe('HavenScenarioListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenScenarioListService = TestBed.get(HavenScenarioListService);
    expect(service).toBeTruthy();
  });
});
