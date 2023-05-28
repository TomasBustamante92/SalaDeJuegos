import { TestBed } from '@angular/core/testing';

import { TecladoService } from './teclado.service';

describe('TecladoService', () => {
  let service: TecladoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecladoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
