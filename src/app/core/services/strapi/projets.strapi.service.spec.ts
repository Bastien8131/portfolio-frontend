import { TestBed } from '@angular/core/testing';

import { ProjetsStrapiService } from './projets.strapi.service';

describe('ProjetsStrapiService', () => {
  let service: ProjetsStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetsStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
