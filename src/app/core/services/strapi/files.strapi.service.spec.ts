import { TestBed } from '@angular/core/testing';

import { FilesStrapiService } from './files.strapi.service';

describe('FilesStrapiService', () => {
  let service: FilesStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
