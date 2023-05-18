import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TecladoComponent } from './teclado/teclado.component';

const routes: Routes = [
  { path: 'Ahorcado', component: AhorcadoComponent },
  { path: 'Teclado', component: TecladoComponent },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
