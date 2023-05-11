import { Component, OnInit } from '@angular/core';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servicioUsuario:ServicioUsuariosService) {}

  ngOnInit(): void {  
    this.servicioUsuario.actualizarUsuarios();

  }

  actualizar(){
    this.servicioUsuario.actualizarUsuarios();
  }
}
