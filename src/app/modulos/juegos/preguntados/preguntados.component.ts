import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaisesService } from 'src/app/services/paises.service';
import { SpinnerService } from 'src/app/services/spinner.service';
declare var window: any;

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  constructor(private paisesService:PaisesService, private router: Router,private spinner:SpinnerService){}
  paises:string[] = [];
  banderas:string[] = [];
  banderaElegida$:string;
  paisElegido$:string;
  random = Math.floor(Math.random() * 100);
  opciones:string[] = ["","","",""];
  formModal:any;
  popUpTitulo = "";
  popUpMensaje = "";
  puntaje = 0;
  intentos = 0;
  estaJugando = true;
  volverAJugarBool = true;
  spinerAndando = false;

  ngOnInit(): void {
    this.volverAJugarBool = true;
    this.spinner.llamarSpinner();
    this.spinerAndando = true;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('colorModal')
    );

    this.paisesService.getPaises$().subscribe(pais => {
      Object.values(pais)
      .map((curr) => {
        this.paises.push(curr.translations.spa.common);
        this.banderas.push(curr.flags.png);
      })
      this.elegirNuevoPais();
      this.spinner.detenerSpinner();
      this.spinerAndando = false;
    });

    setTimeout(()=>{ 
      if(this.spinerAndando){
        this.volverAJugarBool = false;
        this.spinerAndando = false;
        this.estaJugando = false;
        this.abrirPopUp("Error 503", "No pudimos cargar los paises \nIntentelo nuevamente mas tarde");
        this.spinner.detenerSpinner();
      }
    },3000);
  }

  elegirPais(pais:string){
    if(pais == this.paisElegido$){
      this.abrirPopUp("Correcto!", "");
      this.puntaje += 10;
    }
    else{
      this.abrirPopUp("Incorrecto!", "era " + this.paisElegido$);
    }

    this.intentos++;

    if(this.puntaje == 50){
      this.estaJugando = false;
      this.abrirPopUp("Ganaste!", "");
    }
    else{
      this.elegirNuevoPais();
    }
  }

  volverAJugar(){
    this.puntaje = 0;
    this.estaJugando = true;
    this.cerrarPopUp();
    this.elegirNuevoPais();
  }

  getNumeroRandom(max:number){
    return Math.floor(Math.random() * max);
  }

  elegirNuevoPais(){
    this.random = this.getNumeroRandom(this.paises.length);
    this.paisElegido$ = this.paises[this.random];
    this.banderaElegida$ = this.banderas[this.random];
    this.opciones = ["","","",""];
    let paisSeleccionado = false;

    do{
      let posicion = this.getNumeroRandom(4);

      if(this.opciones[posicion] == ""){
        if(!paisSeleccionado){
          paisSeleccionado = true;
          this.opciones[posicion] = this.paises[this.random];
        }
        else{
          this.opciones[posicion] = this.paises[this.getNumeroRandom(this.paises.length)];
        }
      }
      
    }while(this.opciones[0] == "" || this.opciones[1] == "" || this.opciones[2] == "" || this.opciones[3] == "") 
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
