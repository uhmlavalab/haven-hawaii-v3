import { TestBed } from '@angular/core/testing';

import { NrelDatabaseService } from './nrel-database.service';

describe('NrelDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NrelDatabaseService = TestBed.get(NrelDatabaseService);
    expect(service).toBeTruthy();
  });
});
