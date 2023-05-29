import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaisesService } from 'src/app/services/paises.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SpinnerService } from 'src/app/services/spinner.service';
declare var window: any;

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  constructor(private router: Router,private spinner:SpinnerService, private pokemonService:PokemonService){}
  pokemonNombreElegido:string;
  pokemonFotoElegido:string;
  formModal:any;
  popUpTitulo = "";
  popUpMensaje = "";
  puntaje = 0;
  intentos = 0;
  estaJugando = true;
  volverAJugarBool = true;
  spinerAndando = false;
  pokemones:string[] = [];
  pokemonesFotos:string[] = [];

  ngOnInit(): void {
    this.volverAJugarBool = true;
    this.spinerAndando = true;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('colorModal')
    );

    this.elegirNuevoPokemon();
  }

  elegirPokemon(pokemon:string){
    if(pokemon == this.pokemonNombreElegido){
      this.abrirPopUp("Correcto!", "");
      this.puntaje += 10;
    }
    else{
      this.abrirPopUp("Incorrecto!", "era " + this.pokemonNombreElegido);
    }

    this.intentos++;

    if(this.puntaje == 50){
      this.estaJugando = false;
      this.abrirPopUp("Ganaste!", "");
    }
    else{
      this.elegirNuevoPokemon();
    }
  }

  volverAJugar(){
    this.puntaje = 0;
    this.estaJugando = true;
    this.cerrarPopUp();
    this.elegirNuevoPokemon();
  }

  getNumeroRandom(max:number){
    return Math.floor(Math.random() * max);
  }

  elegirNuevoPokemon(){
    this.spinner.llamarSpinner();
    this.pokemones = [];
    this.pokemonesFotos = [];
    this.pokemonNombreElegido = "";
    let random = this.getNumeroRandom(4);

    for(let i=0 ; i<4 ; i++){
      this.pokemonService.getPokemon$(this.getNumeroRandom(151)).subscribe(pokemon => {
        this.pokemones.push(Object.values(pokemon)[2][0].name);
        this.pokemonesFotos.push(Object.values(pokemon)[14].other.dream_world.front_default);
        this.spinerAndando = false;
        if(this.pokemonNombreElegido == ""){
          this.pokemonNombreElegido = Object.values(pokemon)[2][0].name;
          this.pokemonFotoElegido = Object.values(pokemon)[14].other.dream_world.front_default;
        }
        if(this.pokemones.length == 4){
          this.ordernarPokemonesRandom(this.pokemones);
        }
        this.spinner.detenerSpinner();
      });
    }  

    this.timeOut();
  }

  ordernarPokemonesRandom(array:string[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  timeOut(){
    setTimeout(()=>{ 
      if(this.spinerAndando){
        this.volverAJugarBool = false;
        this.spinerAndando = false;
        this.estaJugando = false;
        this.abrirPopUp("Error", "No pudimos cargar los pokemones \nIntentelo nuevamente mas tarde");
        this.spinner.detenerSpinner();
      }
    },3000);
  }

  abrirPopUp(titulo:string, mensaje:string){
    this.popUpTitulo = titulo;
    this.popUpMensaje = mensaje;
    this.formModal.show();
  }
  
  cerrarPopUp() {
    this.formModal.hide();
  }

  salir(){
    this.formModal.hide();
    let routerAux = this.router;
    routerAux.navigateByUrl("");
  }
}
