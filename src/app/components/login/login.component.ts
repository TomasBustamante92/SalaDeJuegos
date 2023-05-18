import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail = "";
  password = "";
  nombreUsuario = "";
  mensajeError = "";
  usuario: Usuario;

  constructor(private usuarioServ:ServicioUsuariosService, private router: Router) {}
  
  ngOnInit(): void {

    if(history.state.usuario != null){
      this.usuario = history.state.usuario;
      this.ingreso();
    }
  }

  resetearMensajeError(){
    this.mensajeError = "";
  }

  ingresarUsuario(){

    if(this.mail == "" || this.password == ""){
      this.mensajeError = "Complete todos los campos";
      return null;
    }

    this.usuarioServ.usuarios.forEach((usuario) => {

      if(this.mail == usuario.mail && this.password == usuario.password){
        
        this.usuario = new Usuario(usuario.id,usuario.nombreUsuario, usuario.mail, usuario.password);
        this.nombreUsuario = usuario.nombreUsuario;
        this.ingreso();
      }
    });

    this.mensajeError = "Usuario o contraseña incorrectos";
    return null;
  }

  ingreso(){
    let routerAux = this.router; 
    this.usuarioServ.setEstaLogueado$(true);
    this.usuarioServ.setUsuarioLogueado(this.usuario);
    routerAux.navigateByUrl("");
  }
}
