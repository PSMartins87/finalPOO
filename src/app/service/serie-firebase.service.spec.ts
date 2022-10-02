import { TestBed } from '@angular/core/testing';

import { SerieFirebaseService } from './serie-firebase.service';

describe('SerieFirebaseService', () => {
  let service: SerieFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
