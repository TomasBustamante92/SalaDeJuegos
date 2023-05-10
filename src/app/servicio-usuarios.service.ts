import { Injectable } from '@angular/core';
import { Usuario } from './clases/usuario';
import { DataServices } from './data.services';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  usuarios : Usuario[] = [];
  // indiceUsuario$: Subject<number>;
  indiceUsuario: number;
  usuarioLogueado$: Subject<Usuario>;
  usuarioAux: Usuario;
  estaLogueado$ : Subject<boolean>;

  constructor(private dataService:DataServices) { 
    this.estaLogueado$ = new Subject();
    this.estaLogueado$.next(false);
    this.usuarioLogueado$ = new Subject();
    // this.indiceUsuario$ = new Subject();
  }


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

  setUsuarioLogueado(usuario:Usuario, indice:number){
    this.usuarioLogueado$.next(usuario);
    // this.indiceUsuario$.next(indice);
    this.indiceUsuario = indice;
    this.setEstaLogueado$(true);
    this.usuarioAux = usuario;
  }

  setEstaLogueado$(value:boolean){
    this.estaLogueado$.next(value);
  }

  getEstaLogueado$() : Observable<boolean> {
    return this.estaLogueado$;
  }

  // getUsuarioIndice() : number {
  //   // return this.indiceUsuario$;
  //   return this.indiceUsuario;
  // }
  
  getUsuarioLogueado$() : Observable<Usuario> {
    return this.usuarioLogueado$;
  }

  actualizarUsuarios(){

    this.usuarioAux.nombreUsuario = 'aver';
    console.log('Usuario: ' + this.usuarioAux.nombreUsuario + ' - Indice: ' + this.indiceUsuario);
    this.dataService.actualizarUsuarios(this.usuarioAux, this.indiceUsuario);
  }
}
