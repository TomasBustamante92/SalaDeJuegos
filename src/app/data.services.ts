import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "./clases/usuario";
import { Firestore } from "@angular/fire/firestore";

@Injectable()
export class DataServices{

  constructor(private httpClient: HttpClient){}

  getUsuarios(){
    return this.httpClient.get('https://saladejuegos-tomas-busta-5ad66-default-rtdb.firebaseio.com/usuarios.json');
  }

  cargarUsuario(usuarios : Usuario[]){

    this.httpClient.put('https://saladejuegos-tomas-busta-5ad66-default-rtdb.firebaseio.com/usuarios.json', usuarios).subscribe(
      response => console.log(response),
      error =>  console.log("Error: " + error)
    );
  }

  actualizarUsuarios(usuario:Usuario, indice:number){
    let url = 'https://saladejuegos-tomas-busta-5ad66-default-rtdb.firebaseio.com/usuarios/ ' + indice +'.json'
    this.httpClient.put(url, usuario).subscribe(
      response => console.log(response),
      error =>  console.log("Error: " + error)
    );
  }
}