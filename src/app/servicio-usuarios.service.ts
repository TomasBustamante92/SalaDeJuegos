import { Injectable } from '@angular/core';
import { Usuario } from './clases/usuario';
import { DataServices } from './data.services';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  constructor(private dataService:DataServices) { }

  usuarios : Usuario[] = [];

  getUsuarios(){

    return this.dataService.getUsuarios();
  }

  setUsuarios(usuarios : Usuario[]){
    this.usuarios = usuarios;
  }

  cargarUsuario(usuario : Usuario){

    this.usuarios.push(usuario);
    this.dataService.cargarUsuario(this.usuarios);
  }
}
