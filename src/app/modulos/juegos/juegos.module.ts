import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { TecladoComponent } from './teclado/teclado.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { FormsModule } from '@angular/forms';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { MonopolyComponent } from './monopoly/monopoly.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

@NgModule({
  declarations: [
    AhorcadoComponent,
    TecladoComponent,
    MayorMenorComponent,
    MonopolyComponent,
    PreguntadosComponent,
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ],
})
export class JuegosModule { }
