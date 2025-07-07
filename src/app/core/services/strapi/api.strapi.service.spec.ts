import { TestBed } from '@angular/core/testing';

import { ApiStrapiService } from './api.strapi.service';

describe('ApiStrapiService', () => {
  let service: ApiStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
