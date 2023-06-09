import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataServices } from 'src/app/data.services';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TecladoComponent } from '../teclado/teclado.component';
import { TecladoService } from 'src/app/services/teclado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit{

  imagen:string = "/assets/AhorcadoImg/ahorcado1.png";
  texto:string;
  perdidas = 0;
  palabraPantalla:string = "_ _ _ _ _";
  palabraArray:string[] = ["_","_","_","_","_"];
  letrasAdivinadasArray:boolean[] = [false, false, false, false, false];
  palabras:string[] = ["luzon",
    "avion","pezon","pollos","quena","ronda","salto","tango","huevo",
    "vicio","avion","yogur","saber","abrir","bravo","caoba","doble",
    "ebrio","fumar","grano","hacha","igual","cuero","playa","lindo",
    "mambo","nacer","obvio","piano","quita","samba","tabla","unido",
    "vapor","besar","circo","drama","feliz","hazlo","ideal",
    "jurar","karma","limbo","miedo","nubes","obvio","plomo"
  ];

  numeroRandom = this.getRandomInt();
  palabraAdivinar:string;
  letrasAdivinadas = 0;
  juegoTerminado = false;

  constructor(private spinner:SpinnerService, private teclado:TecladoService){}
  
  ngOnInit(): void {
    this.palabraAdivinar = this.palabras[this.numeroRandom];
    this.volverAJugar();
  }
  
  getRandomInt() {
    return Math.floor(Math.random() * this.palabras.length);
  }

  volverAJugar(){
    this.spinner.llamarSpinner();
    this.juegoTerminado = false;
    this.perdidas = 0;
    this.letrasAdivinadas = 0;
    this.palabraPantalla = "_ _ _ _ _";
    this.palabraArray = ["_","_","_","_","_"];
    this.letrasAdivinadasArray = [false, false, false, false, false];
    this.numeroRandom = this.getRandomInt();
    this.imagen = "/assets/AhorcadoImg/ahorcado1.png";
    this.palabraAdivinar = this.palabras[this.numeroRandom];
    this.teclado.letrasUsadasArray.forEach(value => {
      value.value = false;
      this.spinner.detenerSpinner();
    })
    this.teclado.letrasIncorrectas = [];
  }
  
  check(letra:string){

    let adivino = false;

    console.log("PALABRA: " + this.palabraAdivinar);

    if(!this.juegoTerminado){

      for(let i=0 ; i<this.palabraAdivinar.length ; i++){
  
        if(!this.letrasAdivinadasArray[i] && letra == this.palabraAdivinar[i]){
  
          this.palabraArray[i] = letra;
          this.letrasAdivinadasArray[i] = true;
          this.letrasAdivinadas++;
          adivino = true;
        }
      }
  
      this.teclado.letrasIncorrectas.push(letra);
      
      this.palabraPantalla = this.palabraArray[0] + " " + this.palabraArray[1] + " " + this.palabraArray[2] + " " + this.palabraArray[3] + " " + this.palabraArray[4];
  
      if(this.letrasAdivinadas < 5 && !adivino){
  
        switch(this.perdidas) { 
          case 0: { 
            this.imagen = "/assets/AhorcadoImg/ahorcado2.png";
            this.perdidas++;
            break;
          } 
          case 1: { 
            this.imagen = "/assets/AhorcadoImg/ahorcado3.png";
            this.perdidas++;
            break;
          } 
          case 2: { 
            this.imagen = "/assets/AhorcadoImg/ahorcado4.png";
            this.perdidas++;
            break;
          } 
          case 3: { 
            this.imagen = "/assets/AhorcadoImg/ahorcado5.png";
            this.perdidas++;
            break;
          } 
          case 4: { 
            this.imagen = "/assets/AhorcadoImg/ahorcado6.png";
            this.perdidas++;
            this.palabraPantalla = "Perdiste";
            this.juegoTerminado = true;
            break;
          } 
        } 
      }
      else if(this.letrasAdivinadas >= 5){
        this.palabraPantalla = "GANASTE!";
        this.juegoTerminado = true;
      }
    }
  }
}
