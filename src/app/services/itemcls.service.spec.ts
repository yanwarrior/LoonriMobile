import { TestBed } from '@angular/core/testing';

import { ItemclsService } from './itemcls.service';

describe('ItemclsService', () => {
  let service: ItemclsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemclsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
