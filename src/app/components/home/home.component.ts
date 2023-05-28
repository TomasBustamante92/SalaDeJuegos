import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioUsuariosService } from 'src/app/servicio-usuarios.service';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servicioUsuario:ServicioUsuariosService, private router: Router) {}
  logueado:boolean;
  formModal: any;
  tipoDeJuego = "";
  popUpMensaje = "";
  botonLink = false;

  ngOnInit(): void {  
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    
    this.servicioUsuario.actualizarUsuarios();
    this.servicioUsuario.getEstaLogueado$().subscribe(logueado => {
      this.logueado = logueado;
    });

    console.log(localStorage.getItem('usuario'));
  }

  abrirPopUp(juego:string) {
    this.botonLink = false
    switch (juego){
      case "ahorcado":
        this.tipoDeJuego = "Ahorcado";
        this.popUpMensaje = "Es un juego de adivinanza donde el objetivo es adivinar la palabra. \n\n" +
        " En cada turno el jugador ingresará una letra en el teclado, " +
        " por cada acierto aparecera la letra en pantalla. " +
        "Por cada error se irá dibujando una parte del cuerpo. Cuando se complete la figura, el jugador habrá perdido. " +
        "\n\n\n" +
        "Perfecto: 100 Puntos \n" + 
        "1 error: 80 Puntos \n" +
        "2 errores: 60 Puntos \n" +
        "3 errores: 40 Puntos \n" +
        "4 errores: 20 Puntos \n";
        break;
      case "mayorMenor":
        this.tipoDeJuego = "Mayor o Menor";
        this.popUpMensaje = "El jugador deberá adivinar si la carta que sigue en el mazo es mayor, menor o igual que la ultima carta. \n" +
        "Se trandrán 12 intentos y cada adivinanza mayor o menor brindará 10 puntos, mientras que cada adivinanza igual brindará 50 puntos."
        break;
      case "monopoly":
        this.tipoDeJuego = "Monopoly";
        this.popUpMensaje = "Basado en el clasico juego de mesa\nPara ver las reglas ir a '¿Quien soy?'";
        this.botonLink = true;
        break;
      case "preguntados":
        this.tipoDeJuego = "Preguntados";
        this.popUpMensaje = "Multiple choice sobre pokemones, cada pokemon adivinado brindará 10 puntos. Al llegar a 50 termina el juego";
        break;
    };

    this.formModal.show();
  }
  cerrarPopUp() {
    this.formModal.hide();
  }

  irAQuienSoy(){
    this.formModal.hide();
    let routerAux = this.router;
    routerAux.navigateByUrl("Quien-Soy");
  }

  ngAfterViewInit() {
    this.servicioUsuario.getEstaLogueado$().subscribe(logueado => {
      this.logueado = logueado;
    })
  }

  actualizar(){
    this.servicioUsuario.actualizarUsuarios();
  }

  ayudaAhorcado(){
    this.formModal.show();
  }

}
