import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { ChatComponent } from './components/chat/chat.component';
import { SalaDeChatGuard } from './guards/sala-de-chat.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "Login", component: LoginComponent },
  { path: "Registro", component: RegistroComponent },
  { path: "Quien-Soy", component: QuienSoyComponent },
  { path: "Chat", component: ChatComponent, canActivate: [SalaDeChatGuard] },
  { path: 'Juegos', loadChildren: () => import('./modulos/juegos/juegos.module').then(m => m.JuegosModule) },
  { path: "**", component: ErrorComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }