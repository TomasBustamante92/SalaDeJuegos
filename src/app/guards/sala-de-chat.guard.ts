import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioUsuariosService } from '../servicio-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SalaDeChatGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(private servicioUsuario:ServicioUsuariosService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let estaLogueado = this.servicioUsuario.estaLogueado;

      if(!estaLogueado){
        this.router.navigate(['/*'], { queryParams: { returnUrl: state.url }});
      }

    return estaLogueado;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
