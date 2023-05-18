import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioUsuariosService } from '../servicio-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SalaDeChatGuard implements CanActivate, CanDeactivate<unknown> {

  estaLogueado:boolean = false;

  constructor(private servicioUsuario:ServicioUsuariosService) {
    this.servicioUsuario.getEstaLogueado$().subscribe(
      esta => {
        this.estaLogueado = esta;
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("CHAT: " + this.estaLogueado);
    return this.estaLogueado;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
