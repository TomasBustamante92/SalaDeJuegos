import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/clases/mensaje';
import { Usuario } from 'src/app/clases/usuario';
import { DataServices } from 'src/app/data.services';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  usuario:Usuario;
  mensajes:Mensaje[] = [];
  texto:string = "";
  mensajeError:string = "";

  constructor(private dataService:DataServices, private usuarioService:ServicioUsuariosService, private spinner:SpinnerService){}

  ngOnInit(): void {

    this.spinner.llamarSpinner();

    this.dataService.getMensajes().subscribe(msj => {
      this.mensajes = msj;
      this.mensajes.sort((a, b) => a.id - b.id); 
      this.spinner.detenerSpinner();
    });
  }
  

  publicarMensaje(){


    if(this.texto != ""){

      let mensaje = new Mensaje(this.getIdDisponible(), this.usuarioService.usuarioAux.nombreUsuario, this.texto, this.getDate());
      this.dataService.cargarChat(mensaje, this.mensajes);
    }
    else{
      this.mensajeError = "El mensaje está vacio";
    }

    this.texto = "";
  }

  resetearMensajeError(){
    this.mensajeError = "";
  }

  getDate(){
    let aux = new Date();
    let str = aux.toLocaleString();
    var splitted = str.split(",", 2); 
    return splitted[1] + ", " + splitted[0];
  }

  getIdDisponible(){

    let id = -1;

    if(this.mensajes.length != 0){

      this.mensajes.forEach(mensaje => {
  
        if(mensaje.id > id){
          id = mensaje.id;
        }
      });

      console.log("id "+id);
      id++;
      console.log("id++ "+id);

    }
    else{
      id = 0;
    }

    return id;
  }
}
