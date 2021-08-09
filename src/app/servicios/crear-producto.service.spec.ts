import { TestBed } from '@angular/core/testing';

import { CrearProductoService } from './crear-producto.service';

describe('CrearProductoService', () => {
  let service: CrearProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
