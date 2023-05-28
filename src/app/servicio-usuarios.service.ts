import { Injectable } from '@angular/core';
import { Usuario } from './clases/usuario';
import { DataServices } from './data.services';
import { Observable, Subject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  usuarios: Usuario[] = [];
  usuarioLogueado$: Subject<Usuario>;
  usuarioAux: Usuario;
  estaLogueado$ : Subject<boolean>;
  estaLogueado : boolean;

  constructor(private dataService:DataServices, private auth:Auth) { 
    this.estaLogueado$ = new Subject();
    this.estaLogueado$.next(false);
    this.usuarioLogueado$ = new Subject();
  }

  registrarse(mail:string,password:string){
    return createUserWithEmailAndPassword(this.auth,mail,password);
  }

  ingresar(mail:string,password:string){
    return signInWithEmailAndPassword(this.auth,mail,password);
  }

  salir(){
    return signOut(this.auth);
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
    this.estaLogueado = value;
  }

  getEstaLogueado$(): Observable<boolean> {
    return this.estaLogueado$;
  }

  getEstaLogueado(): boolean {
    return this.estaLogueado;
  }

  getUsuarioLogueado$(): Observable<Usuario> {
    return this.usuarioLogueado$;
  }

  actualizarUsuarios(){
    this.dataService.actualizarUsuarios(this.usuarioAux);
  }
}
