import { Component } from '@angular/core';
import { MonopolyData } from './monopoly-data';

declare var window: any;

@Component({
  selector: 'app-monopoly',
  templateUrl: './monopoly.component.html',
  styleUrls: ['./monopoly.component.css']
})
export class MonopolyComponent {

  // Data
  colores = {rojo: '/assets/monopoly/brick-red.png', azul: '/assets/monopoly/brick-blue.png',verde: '/assets/monopoly/brick-green.png',
    amarillo: '/assets/monopoly/brick-yellow.png',violeta: '/assets/monopoly/brick-purple.png'};
  dados = {uno:'/assets/monopoly/dado1.png',dos:'/assets/monopoly/dado2.png',tres:'/assets/monopoly/dado3.png',
    cuatro:'/assets/monopoly/dado4.png',cinco:'/assets/monopoly/dado5.png',seis:'/assets/monopoly/dado6.png'};

  // Tablero
  dadosElegidos = [this.dados.uno,this.dados.uno];
  jugadorVertice = [{altura: "", lado: ""},{altura: "", lado: ""}];
  colorJugadores:string[] = ['rgb(222, 31, 9)', 'rgb(0, 151, 247)'];
  puntos:string[] = [this.colores.rojo,this.colores.azul];

  // Jugadores
  posicionesJugadores = [0,0];
  montoJugadores = [1500,1500];
  propiedadesJugador1:string[] = [];
  propiedadesJugador2:string[] = [];

  // Popup
  formModal: any;
  popUpTitulo = "";
  popUpMensaje = "";
  esPopUpColor = true;

  // Misc
  finDeJuego = false;
  compraCasa:boolean = false;
  jugadorActual = 0;
  jugadorActualStr = "jugador1";
  indice:number;
  enCarcel = [false,false];
  puedeJugar = true;
  turnosEnCarcel = [3,3];

  ngOnInit(): void {
    this.jugadorVertice[0].altura = MonopolyData.posicionesJugador1[0].altura;
    this.jugadorVertice[0].lado = MonopolyData.posicionesJugador1[0].lado;
    this.jugadorVertice[1].altura = MonopolyData.posicionesJugador2[0].altura;
    this.jugadorVertice[1].lado = MonopolyData.posicionesJugador2[0].lado;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('colorModal')
    );
    this.elegirColor();
  }

  jugar(jugador:number){
    this.compraCasa = false;
    if(this.puedeJugar || jugador == 1){
      this.jugadorActual = jugador;
      if(jugador == 0){
        this.jugadorActualStr = "jugador1";
        this.puedeJugar = false;
      }
      else{
        this.jugadorActualStr = "jugador2";
        this.puedeJugar = true;
      }
      let tirada = this.tirarDado(); 

      if(!this.enCarcel[jugador] || this.dadosElegidos[0] == this.dadosElegidos[1] || this.turnosEnCarcel[jugador] == 0){
        this.enCarcel[jugador] = false;
        this.turnosEnCarcel[jugador] = 3;
        this.moverJugador(tirada);
      }
      else{
        this.turnosEnCarcel[jugador]--;
        if(this.jugadorActual == 0){
          this.abrirPopUp("Que lastima", "Te quedan " + this.turnosEnCarcel[jugador] + " turnos para salir");
        }
      }
    }
    else{
      this.abrirPopUp("Ya jugaste tu turno", "Pulsar 'Terminar turno'");
    }
  }

  tirarDado(){
    let numero1 = this.getNumeroRandom(5);
    let numero2 = this.getNumeroRandom(5);
    this.dadosElegidos[0] = this.cambiarDado(numero1);
    this.dadosElegidos[1] = this.cambiarDado(numero2);
    return numero1 + numero2 + 2;
  }

  getNumeroRandom(max:number){
    return Math.floor(Math.random() * max);
  }

  cambiarDado(numero:number){
    let dado:string = this.dados.uno;
    switch (numero){
      case 0:
        dado = this.dados.uno;
      break;
      case 1:
          dado = this.dados.dos;
        break;
      case 2:
          dado = this.dados.tres;
        break;
      case 3:
          dado = this.dados.cuatro;
        break;
      case 4:
          dado = this.dados.cinco;
        break;
      case 5:
        dado = this.dados.seis;
      break;
    }
    return dado;
  }

  moverJugador(tirada:number){
    let posicionAnterior = this.posicionesJugadores[this.jugadorActual];
    this.posicionesJugadores[this.jugadorActual] = this.avanzar(tirada, posicionAnterior);    
    let posicionActual = this.posicionesJugadores[this.jugadorActual]; 
    this.moverFicha(posicionActual);
    this.pasaPorSalida(posicionAnterior);
    let aterrizaje = this.aterrizaEnPropiedad();
    if(aterrizaje == 'Propiedad' && MonopolyData.posiciones[posicionActual].duenio == undefined){
      this.pagarImpuestos(posicionActual);
    }
    else if(aterrizaje == 'Propiedad' && MonopolyData.posiciones[posicionActual].duenio == "false"){
      this.comprarPropiedad();
    }
    else if(aterrizaje == 'Propiedad'){
      this.pagarAlquiler(MonopolyData.posiciones[posicionActual].duenio);
    }
    else{
      this.posicionesExtras();
    }
  }

  avanzar(casillas:number, ultimaCasilla:number){
    if((ultimaCasilla + casillas) >= MonopolyData.posicionesJugador1.length){
      ultimaCasilla = ultimaCasilla - MonopolyData.posicionesJugador1.length + casillas;
    }
    else{
      ultimaCasilla += casillas;
    }
    return ultimaCasilla;
  }

  pasaPorSalida(posicionAnterior:number){
    if(this.posicionesJugadores[this.jugadorActual] < posicionAnterior){
      this.montoJugadores[this.jugadorActual] += MonopolyData.posiciones[0].precio;
    }
  }

  aterrizaEnPropiedad(){
    let posicion = this.posicionesJugadores[this.jugadorActual];
    let retorno = "Propiedad";
    if(MonopolyData.posiciones[posicion].nombre == "Salida" || MonopolyData.posiciones[posicion].nombre == "Suerte" ||
    MonopolyData.posiciones[posicion].nombre == "Carcel" || MonopolyData.posiciones[posicion].nombre == "Vaya a la Carcel" ||
    MonopolyData.posiciones[posicion].nombre == "Arca Comunal" || MonopolyData.posiciones[posicion].nombre == "Libre Estacionamiento"){
      retorno = MonopolyData.posiciones[posicion].nombre;
    }
    return retorno;
  }

  pagarAlquiler(duenio:string | undefined){
    let posicion = this.posicionesJugadores[this.jugadorActual];
    let msj = "";
    let monto = MonopolyData.posiciones[posicion].precio;
    if(this.jugadorActual == 0 && duenio == "jugador1"){
      msj = "Estas en tu propiedad";
    }
    else if(this.jugadorActual == 0 && duenio == "jugador2"){
      msj = "Estás en la propiedad del Jugador 2 \nDebes pagar $"  + MonopolyData.posiciones[posicion].precio;
      this.montoJugadores[0] -= monto;
      this.montoJugadores[1] += monto;
    }
    else if(this.jugadorActual == 1 && duenio == "jugador1"){
      msj = "El Jugador 2 está en tu propiedad \nDebe pagar $" + MonopolyData.posiciones[posicion].precio;
      this.montoJugadores[0] += monto;
      this.montoJugadores[1] -= monto;
    }
    if(msj != ""){
      this.abrirPopUp(MonopolyData.posiciones[posicion].nombre, msj);
    }
  }

  pagarImpuestos(posicion:number){
    this.abrirPopUp(MonopolyData.posiciones[posicion].nombre, "Debe pagar $" + MonopolyData.posiciones[posicion].precio);
    this.montoJugadores[this.jugadorActual] -= MonopolyData.posiciones[posicion].precio;
  }

  comprarPropiedad(){
    if(this.jugadorActual == 0 && this.montoJugadores[this.jugadorActual] > MonopolyData.posiciones[this.posicionesJugadores[this.jugadorActual]].precio){
      this.compraCasa = true;
      this.abrirPopUp(MonopolyData.posiciones[this.posicionesJugadores[this.jugadorActual]].nombre, "Casa disponible\n\nValor de compra $" + 
      MonopolyData.posiciones[this.posicionesJugadores[this.jugadorActual]].valorCompra + 
      "\nSe puede alquilar por $" + MonopolyData.posiciones[this.posicionesJugadores[this.jugadorActual]].precio);
    }
    else if(this.montoJugadores[this.jugadorActual] > MonopolyData.posiciones[this.posicionesJugadores[this.jugadorActual]].precio){
      let random = this.getNumeroRandom(3) + 1;
      if(random > 1){
        this.comprarCasa();
      }
    }
    else if(this.jugadorActual == 0){
      this.abrirPopUp(MonopolyData.posiciones[this.posicionesJugadores[this.jugadorActual]].nombre, "No tiene dinero suficiente para comprar esta propiedad");
    }
  }

  volverAJugar(){
    this.jugadorVertice[0].altura = MonopolyData.posicionesJugador1[0].altura;
    this.jugadorVertice[0].lado = MonopolyData.posicionesJugador1[0].lado;
    this.jugadorVertice[1].altura = MonopolyData.posicionesJugador2[0].altura;
    this.jugadorVertice[1].lado = MonopolyData.posicionesJugador2[0].lado;
    this.propiedadesJugador1 = [];
    this.propiedadesJugador2 = [];
    this.posicionesJugadores = [0,0];
    this.montoJugadores = [1500,1500];
    this.finDeJuego = false;
    this.formModal.hide();
    this.turnosEnCarcel = [3,3];
  }

  posicionesExtras(){
    let posicion = this.posicionesJugadores[this.jugadorActual];
    let nombrePosicion = MonopolyData.posiciones[posicion].nombre;
    switch(nombrePosicion){
      case "Salida":
        this.abrirPopUp(MonopolyData.posiciones[posicion].nombre, "Pasa por salida, cobrese $200");
        break;
      case "Arca Comunal":
        this.abrirPopUp(MonopolyData.posiciones[posicion].nombre, this.cobrarArca());
        break;
        case "Suerte":
          this.abrirPopUp(MonopolyData.posiciones[posicion].nombre, this.cobrarSuerte());
          break;
      case "Carcel":
        if(this.jugadorActual == 0){
          this.abrirPopUp("Carcel", "Perdes 3 turnos \nPodes salir si sacas numeros iguales en los dados");
        }
        this.enCarcel[this.jugadorActual] = true;
        break;
      case "Vaya a la Carcel":
        this.posicionesJugadores[this.jugadorActual] = 10;  
        if(this.jugadorActual == 0){
          this.abrirPopUp("Vaya a la Carcel", "Perdes 3 turnos \nPodes salir si sacas numeros iguales en los dados");
        }
        this.moverFicha(10);
        this.enCarcel[this.jugadorActual] = true;
        break;
    }
  }

  comprarCasa(){
    let indice = this.posicionesJugadores[this.jugadorActual];
    MonopolyData.posiciones[indice].duenio = this.jugadorActualStr;
    if(this.jugadorActualStr == "jugador1"){
      this.montoJugadores[0] -= MonopolyData.posiciones[indice].valorCompra;
      this.propiedadesJugador1.push(MonopolyData.posiciones[indice].nombre);
      this.cerrarPopUp();
    }
    else{
      this.montoJugadores[1] -= MonopolyData.posiciones[indice].valorCompra;
      this.propiedadesJugador2.push(MonopolyData.posiciones[indice].nombre);
    }
  }

  elegirColor() {
    this.popUpTitulo = "Elija un color";
    this.popUpMensaje = '';
    this.formModal.show();
  }

  moverFicha(posicion:number){
    if(this.jugadorActual == 0){
      this.jugadorVertice[this.jugadorActual].altura = MonopolyData.posicionesJugador1[posicion].altura;
      this.jugadorVertice[this.jugadorActual].lado = MonopolyData.posicionesJugador1[posicion].lado;
    }
    else{
      this.jugadorVertice[this.jugadorActual].altura = MonopolyData.posicionesJugador2[posicion].altura;
      this.jugadorVertice[this.jugadorActual].lado = MonopolyData.posicionesJugador2[posicion].lado;
    }
  }

  cobrarSuerte(){
    let random = this.getNumeroRandom(5);
    let suerte = MonopolyData.suertes[random];
    let msj = suerte.texto;
    if(this.jugadorActual == 0){
      switch(suerte.destino){
        case "jugadorPagar":
          this.montoJugadores[0] -= suerte.precio;
          this.montoJugadores[1] += suerte.precio;
          break;
        case "Plaza San Carlos":
          this.moverFicha(11);
          this.posicionesJugadores[this.jugadorActual] = 11;  
          break;
        case "Carcel":
          this.moverFicha(10);
          this.posicionesJugadores[this.jugadorActual] = 10;  
          this.enCarcel[this.jugadorActual] = true;
          break;
        case "reparaciones":
          let cantPropiedades = 0;
          this.propiedadesJugador1.forEach(prop => {
            cantPropiedades++;
          });
          this.montoJugadores[0] -= (suerte.precio * cantPropiedades);
          break;
        case "retroceder":
          let posicion = this.posicionesJugadores[0] - 3;
          if(posicion < 0){
            posicion = 0;
          }
          this.jugadorVertice[0].altura = MonopolyData.posicionesJugador1[posicion].altura;
          this.jugadorVertice[0].lado = MonopolyData.posicionesJugador1[posicion].lado;
          break;
        case "yo":
          this.montoJugadores[0] += suerte.precio;
          break;
      }
    }
    else{
      switch(suerte.destino){
        case "jugadorPagar":
          this.montoJugadores[1] -= suerte.precio;
          this.montoJugadores[0] += suerte.precio;
          break;
        case "Plaza San Carlos":
          this.jugadorVertice[1].altura = MonopolyData.posicionesJugador2[11].altura;
          this.jugadorVertice[1].lado = MonopolyData.posicionesJugador2[11].lado;
          break;
        case "Carcel":
          this.jugadorVertice[1].altura = MonopolyData.posicionesJugador2[10].altura;
          this.jugadorVertice[1].lado = MonopolyData.posicionesJugador2[10].lado;
          break;
        case "reparaciones":
          let cantPropiedades = 0;
          this.propiedadesJugador2.forEach(prop => {
            cantPropiedades++;
          });
          this.montoJugadores[1] -= (suerte.precio * cantPropiedades);
          break;
        case "retroceder":
          let posicion = this.posicionesJugadores[1] - 3;
          if(posicion < 0){
            posicion = 0;
          }
          this.jugadorVertice[1].altura = MonopolyData.posicionesJugador2[posicion].altura;
          this.jugadorVertice[1].lado = MonopolyData.posicionesJugador2[posicion].lado;
          break;
        case "yo":
          this.montoJugadores[1] += suerte.precio;
          break;
      }
    }

    return msj;
  }

  cobrarArca(){
    let random = this.getNumeroRandom(5);
    let arca = MonopolyData.arcas[random];
    let msj = arca.texto;
    if(this.jugadorActual == 0){
      switch(arca.destino){
        case "yo":
          this.montoJugadores[0] += arca.precio;
          break;
        case "jugadorCobrar":
          this.montoJugadores[1] -= arca.precio;
          this.montoJugadores[0] += arca.precio;
          break;
        case "banco":
          this.montoJugadores[0] -= arca.precio;
          break;
      }
    }
    else{
      switch(arca.destino){
        case "yo":
          this.montoJugadores[1] += arca.precio;
          break;
        case "jugadorCobrar":
          this.montoJugadores[0] -= arca.precio;
          this.montoJugadores[1] += arca.precio;
          break;
        case "banco":
          this.montoJugadores[1] -= arca.precio;
          break;
      }
    }
    return msj;
  }

  cerrarElegirColor(color:string){
    this.puntos[1] = this.colores.azul;
    switch (color){
      case 'rojo':
        this.colorJugadores[0] = 'rgb(222, 31, 9)';
        this.puntos[0] = this.colores.rojo;
        break;
      case 'azul':
        this.puntos[0] = this.colores.azul;
        this.colorJugadores[0] = 'rgb(0, 151, 247)';
        this.puntos[1] = this.colores.rojo;
        this.colorJugadores[1] = 'rgb(222, 31, 9)';
        break;
      case 'violeta':
        this.puntos[0] = this.colores.violeta;
        this.colorJugadores[0] = 'rgb(205, 11, 214)';
        break;
      case 'amarillo':
        this.puntos[0] = this.colores.amarillo;
        this.colorJugadores[0] = 'rgb(255, 248, 13)';
        break;
      case 'verde':
        this.puntos[0] = this.colores.verde;
        this.colorJugadores[0] = 'rgb(60, 214, 11)';
        break;
    }
    this.esPopUpColor = false;
    this.abrirPopUp("","Clickea uno de los dados para comenzar");
  }

  terminoElJuego(){
    if(this.montoJugadores[0] <= 0){
      this.popUpTitulo = "Perdiste";
      this.finDeJuego = true;
      this.popUpMensaje = "¿Queres volver a jugar?";
    }
    else if(this.montoJugadores[1] <= 0){
      this.popUpTitulo = "Ganaste!";
      this.finDeJuego = true;
      this.popUpMensaje = "¿Queres volver a jugar?";
    }
  }

  abrirPopUp(titulo:string, mensaje:string){
    this.terminoElJuego();
    if(!this.finDeJuego){
      this.popUpTitulo = titulo;
      this.popUpMensaje = mensaje;
    }
    this.formModal.show();  
  }

  cerrarPopUp() {
      this.formModal.hide();
  }
}

