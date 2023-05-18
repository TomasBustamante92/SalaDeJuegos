import { Component } from '@angular/core';
import { Mensaje } from 'src/app/clases/mensaje';
import { Usuario } from 'src/app/clases/usuario';
import { DataServices } from 'src/app/data.services';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  usuario:Usuario;
  mensajes:Mensaje[] = [];
  texto:string;

  constructor(private dataService:DataServices, private usuarioService:ServicioUsuariosService){
    dataService.getMensajes().subscribe(msj => {
      
      this.mensajes = msj;
    });
  }
  

  publicarMensaje(){
    let mensaje = new Mensaje(this.usuarioService.usuarioAux.nombreUsuario, this.texto);
    this.dataService.cargarChat(mensaje, this.mensajes);
  }
}
