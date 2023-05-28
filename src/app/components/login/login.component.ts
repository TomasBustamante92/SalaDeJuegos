import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { SpinnerService } from 'src/app/services/spinner.service';
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
  usuarioEncontrado:boolean = false;

  constructor(private usuarioServ:ServicioUsuariosService, private router: Router, private spinner:SpinnerService) {}
  
  ngOnInit(): void {
    this.usuarioEncontrado = false;
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
        this.usuarioEncontrado = true;
        this.usuario = new Usuario(usuario.id,usuario.nombreUsuario, usuario.mail, usuario.password);
        this.nombreUsuario = usuario.nombreUsuario;
        this.ingresarAuth();
      }
    });

    if(!this.usuarioEncontrado){
      this.mensajeError = "Usuario o contraseña incorrectos";
    }
    return null;
  }

  ingresarAuth(){
    this.usuarioServ.ingresar(this.usuario.mail,this.usuario.password)
    .then(response => {
      localStorage.setItem('usuario',JSON.stringify(response.user));
      this.ingreso();
    })
    .catch(error => console.log(error));
  }

  ingreso(){
    let routerAux = this.router; 
    this.usuarioServ.setEstaLogueado$(true);
    this.usuarioServ.setUsuarioLogueado(this.usuario);
    routerAux.navigateByUrl("");
  }
}
