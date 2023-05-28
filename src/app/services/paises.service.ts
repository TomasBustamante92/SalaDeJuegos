import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  paises:string[] = [];
  banderas:string[] = [];

  constructor(private httpClient:HttpClient) {
    this.getPaises$().subscribe(pais => {
      Object.values(pais)
      .map((curr) => {
        this.paises.push(curr.translations.spa.common);
        this.banderas.push(curr.flags.png);
      })
    });
  }

  getPaises$(){
    return this.httpClient.get('https://restcountries.com/v3.1/all');
  }
}
