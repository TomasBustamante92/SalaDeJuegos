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
  usuarioEnBaseDeDatos = false;
  mensajeError = "";

  constructor(private miServicio : ServicioUsuariosService, private router: Router){}

  registrarUsuario(){

    if(!this.estanCamposCompletos()){
      this.mensajeError = "Complete todos los campos";
      return null;
    }
    
    this.usuarioEnBaseDeDatos = this.estaUsuarioEnBaseDeDatos();
    if(this.usuarioEnBaseDeDatos){
      this.mensajeError = "Ya existe una cuenta con este mail";
      return null;
    }

    if(this.password != this.passwordRepetir){
      this.mensajeError = "Las contraseñas no son iguales";
      return null;
    }

    let routerAux = this.router;
    let usuarioAux = new Usuario("", this.nombreUsuario, this.mail, this.password);
    this.miServicio.cargarUsuario(usuarioAux);

    routerAux.navigateByUrl("Login", { state: {usuario: usuarioAux}});
    return null;
  }

  estaUsuarioEnBaseDeDatos(){

    let retorno = false;

    this.miServicio.usuarios.forEach(usuario => {

      if(this.mail == usuario.mail){
        retorno = true;
      }
    });

    return retorno;
  }

  resetearMensajeError(){
    this.mensajeError = "";
  }

  estanCamposCompletos(){

    if(this.mail == "" || this.nombreUsuario == "" || this.password == ""){
      return false;
    }

    return true;
  }
}
