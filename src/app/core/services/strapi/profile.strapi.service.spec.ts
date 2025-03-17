import { TestBed } from '@angular/core/testing';

import { ProfileStrapiService } from './profile.strapi.service';

describe('ProfileStrapiService', () => {
  let service: ProfileStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
