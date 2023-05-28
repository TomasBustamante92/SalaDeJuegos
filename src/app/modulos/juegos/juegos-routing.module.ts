import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TecladoComponent } from './teclado/teclado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { MonopolyComponent } from './monopoly/monopoly.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

const routes: Routes = [
  { path: 'Ahorcado', component: AhorcadoComponent },
  { path: 'Teclado', component: TecladoComponent },
  { path: 'MayorMenor', component: MayorMenorComponent },
  { path: 'Monopoly', component: MonopolyComponent },
  { path: 'Preguntados', component: PreguntadosComponent },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
