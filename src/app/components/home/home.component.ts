import { Component, OnInit } from '@angular/core';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servicioUsuario:ServicioUsuariosService) {}
  logueado:boolean;

  ngOnInit(): void {  

    this.servicioUsuario.actualizarUsuarios();
    
    this.servicioUsuario.getEstaLogueado$().subscribe(logueado => {

      this.logueado = logueado;
    })
  }

  ngAfterViewInit() {
    this.servicioUsuario.getEstaLogueado$().subscribe(logueado => {

      this.logueado = logueado;
    })
  }

  actualizar(){
    this.servicioUsuario.actualizarUsuarios();
  }

}
