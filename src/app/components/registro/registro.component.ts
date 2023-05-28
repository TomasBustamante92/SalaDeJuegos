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

    this.registrarAuth(); 

    return null;
  }

  registrarAuth(){
    this.miServicio.registrarse(this.mail,this.password)
    .then(response => {
      let routerAux = this.router;
      let usuarioAux = new Usuario("", this.nombreUsuario, this.mail, this.password);
      this.miServicio.cargarUsuario(usuarioAux);
      this.miServicio.setEstaLogueado$(true);
      this.miServicio.setUsuarioLogueado(usuarioAux);
      localStorage.setItem('usuario',JSON.stringify(response.user));
      routerAux.navigateByUrl("");

    })
    .catch(error => {
      if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
        this.mensajeError = "Mail con formato invalido";
      }
      else if(error = "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
        this.mensajeError = "Contraseña debe ser minimo 6 caracteres";
      }
      else{
        this.mensajeError = error;
      }
    });
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
