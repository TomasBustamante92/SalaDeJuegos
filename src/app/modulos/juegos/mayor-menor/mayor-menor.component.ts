import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  ngOnInit(): void {
    this.volverAJugar();
  }

  indiceCartasUsadas:number[] = [];
  cartas = [ { img: "/assets/Cartas/basto 4.png", value: 4 },
            { img: "/assets/Cartas/basto 7.png", value: 7 },
            { img: "/assets/Cartas/basto 12.png", value: 12 },
            { img: "/assets/Cartas/copa 2.png", value: 2 },
            { img: "/assets/Cartas/copa 5.png", value: 5 },
            { img: "/assets/Cartas/copa 11.png", value: 11 },
            { img: "/assets/Cartas/espada 1.png", value: 1 },
            { img: "/assets/Cartas/espada 4.png", value: 4 },
            { img: "/assets/Cartas/espada 11.png", value: 11 },
            { img: "/assets/Cartas/oro 3.png", value: 3 },
            { img: "/assets/Cartas/oro 10.png", value: 10 },
            { img: "/assets/Cartas/oro 1.png", value: 1 },
            { img: "/assets/Cartas/basto 7.png", value: 7 }];
  mazo:string;
  numeroRandom:number;
  cartaRandom:string;
  cartaAnterior:number;
  puntos:number = 0;
  cartasRestantes = 12;
  juegoTerminado = false;

  volverAJugar(){
    this.mazo = "/assets/Cartas/carta 0.png"
    this.numeroRandom = Math.floor(Math.random() * 12);
    this.cartaRandom = this.cartas[this.numeroRandom].img;
    this.cartaAnterior = this.cartas[this.numeroRandom].value;
    this.puntos = 0;
    this.cartasRestantes = 12;
    this.juegoTerminado = false;
    this.indiceCartasUsadas = [];
  }

  getRandomInt() {
    
    let numero = Math.floor(Math.random() * 12);
    let numeroUsado = false;

    if(this.indiceCartasUsadas.length != 12){

      do{
        numeroUsado = false;
  
        this.indiceCartasUsadas.forEach(carta => {

          if(carta == numero){
            numeroUsado = true;
            numero = Math.floor(Math.random() * 12);
          }
        });
          
      }while(numeroUsado);
    }
    return numero;
  }

  cartaNueva(apuesta:string){
    let numero = this.getRandomInt();
    let acerto;

    if(this.indiceCartasUsadas.length != 12){
      acerto = this.acertoApuesta(this.compararCartas(this.cartaAnterior, this.cartas[numero].value), apuesta);


      if(acerto){
        this.puntos += 10;

        if(apuesta == "iguales"){
          this.puntos += 40;
        }
      }


      this.cartasRestantes--;

      this.indiceCartasUsadas.push(numero);
      this.cartaRandom = this.cartas[numero].img;
      this.cartaAnterior = this.cartas[numero].value;
    }
    
    if (this.indiceCartasUsadas.length == 12){
      this.mazo = "";
      this.juegoTerminado = true;
    }
  }

  compararCartas(numeroAnterior:number, numeroActual:number){
    return numeroActual - numeroAnterior;
  }

  acertoApuesta(diferencia:number, apuesta:string){

    let retorno = false;

    switch(apuesta){
      case "mayor":
        if(diferencia > 0){
          retorno = true;
        }
        break;
      case "menor":
        if(diferencia < 0){
          retorno = true;
        }
        break;
      case "iguales":
        if(diferencia == 0){
          retorno = true;
        }
        break;
    }

    return retorno;
  }
}
