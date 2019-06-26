import { TestBed } from '@angular/core/testing';

import { HavenDatabaseService } from './haven-database.service';

describe('HavenDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HavenDatabaseService = TestBed.get(HavenDatabaseService);
    expect(service).toBeTruthy();
  });
});
