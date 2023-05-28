import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TecladoService {

  constructor() { }

  public letrasIncorrectas:string[] = [];
  public letrasUsadasArray = [{key: 'q', value: false}, {key: 'w', value: false}, {key: 'e', value: false},{key: 'r', value: false},{key: 't', value: false},
  {key: 'y', value: false}, {key: 'u', value: false}, {key: 'i', value: false},{key: 'o', value: false},{key: 'p', value: false},
  {key: 'a', value: false}, {key: 's', value: false}, {key: 'd', value: false},{key: 'f', value: false},{key: 'g', value: false},
  {key: 'h', value: false}, {key: 'j', value: false}, {key: 'k', value: false},{key: 'l', value: false},{key: 'ñ', value: false},
  {key: 'z', value: false}, {key: 'x', value: false}, {key: 'c', value: false},{key: 'v', value: false},{key: 'b', value: false},
  {key: 'n', value: false}, {key: 'm', value: false}];
}
