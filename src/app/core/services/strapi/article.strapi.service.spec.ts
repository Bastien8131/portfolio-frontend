import { TestBed } from '@angular/core/testing';

import { ArticleStrapiService } from './article.strapi.service';

describe('ArticleStrapiService', () => {
  let service: ArticleStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
