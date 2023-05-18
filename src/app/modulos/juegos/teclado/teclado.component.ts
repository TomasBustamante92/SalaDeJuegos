import { Component, EventEmitter, Output } from '@angular/core';
import { DataServices } from 'src/app/data.services';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.css']
})
export class TecladoComponent {
 
  constructor(private dataService:DataServices){  }
  
  @Output() letraPresionada = new EventEmitter<string>();

  letrasUsadasArray = this.dataService.letrasUsadasArray;

  teclado(letra:string){

    this.letraPresionada.emit(letra);

    this.letrasUsadasArray.forEach(value => {
      
      this.dataService.letrasIncorrectas.forEach(l => {

        if(l == value.key){
          value.value = true;
        }
      });
    });
  }

}
