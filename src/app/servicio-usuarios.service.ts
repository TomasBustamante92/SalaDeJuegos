import { Injectable } from '@angular/core';
import { Usuario } from './clases/usuario';
import { DataServices } from './data.services';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  usuarios : Usuario[] = [];
  usuarioLogueado$: Subject<Usuario>;
  usuarioAux: Usuario;
  estaLogueado$ : Subject<boolean>;

  constructor(private dataService:DataServices) { 
    this.estaLogueado$ = new Subject();
    this.estaLogueado$.next(false);
    this.usuarioLogueado$ = new Subject();
  }

  getUsuarios(){
    return this.dataService.getUsuarios();
  }

  setUsuarios(usuarios : Usuario[]){
    this.usuarios = usuarios;
  }

  cargarUsuario(usuario:Usuario){

    this.dataService.cargarUsuario(usuario, this.usuarios);
  }

  setUsuarioLogueado(usuario:Usuario){
    this.usuarioLogueado$.next(usuario);
    this.setEstaLogueado$(true);
    this.usuarioAux = usuario;
    this.usuarioAux.fechaIngreso = new Date();
  }

  setEstaLogueado$(value:boolean){
    this.estaLogueado$.next(value);
  }

  getEstaLogueado$(): Observable<boolean> {
    return this.estaLogueado$;
  }

  getUsuarioLogueado$(): Observable<Usuario> {
    return this.usuarioLogueado$;
  }

  actualizarUsuarios(){
    this.dataService.actualizarUsuarios(this.usuarioAux);
  }
}
