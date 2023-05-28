import { Component, EventEmitter, Output } from '@angular/core';
import { TecladoService } from 'src/app/services/teclado.service';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.css']
})
export class TecladoComponent {
 
  constructor(private tecladoService:TecladoService){  }
  
  @Output() letraPresionada = new EventEmitter<string>();

  letrasUsadasArray = this.tecladoService.letrasUsadasArray;

  teclado(letra:string){

    this.letraPresionada.emit(letra);

    this.letrasUsadasArray.forEach(value => {
      
      this.tecladoService.letrasIncorrectas.forEach(l => {

        if(l == value.key){
          value.value = true;
        }
      });
    });
  }

}
