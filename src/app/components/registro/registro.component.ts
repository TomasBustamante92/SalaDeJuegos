import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  mail = "";
  nombreUsuario = "";
  password = "";
  passwordRepetir = "";


  constructor(private miServicio : ServicioUsuariosService, private router: Router){}

  registrarUsuario(){

    if(this.password == this.passwordRepetir){

      let routerAux = this.router;
      let usuarioAux = new Usuario(this. nombreUsuario, this.mail, this.password);
      this.miServicio.cargarUsuario(usuarioAux);

      routerAux.navigateByUrl("Login", { state: {mail: this.mail, nombreUsuario: this.nombreUsuario}});
    }
    else{
      alert("no son iguales");
    }
  }
}
