import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { TecladoComponent } from './teclado/teclado.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
    AhorcadoComponent,
    TecladoComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
