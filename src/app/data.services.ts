import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "./clases/usuario";
import { doc, addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, setDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Mensaje } from "./clases/mensaje";

@Injectable()
export class DataServices{

  constructor(private httpClient: HttpClient, private firestore: Firestore){}
  col = collection(this.firestore, 'usuarios');
  mensajesDB = collection(this.firestore, 'mensajes');
  letrasIncorrectas:string[] = [];
  letrasUsadasArray = [{key: 'q', value: false}, {key: 'w', value: false}, {key: 'e', value: false},{key: 'r', value: false},{key: 't', value: false},
  {key: 'y', value: false}, {key: 'u', value: false}, {key: 'i', value: false},{key: 'o', value: false},{key: 'p', value: false},
  {key: 'a', value: false}, {key: 's', value: false}, {key: 'd', value: false},{key: 'f', value: false},{key: 'g', value: false},
  {key: 'h', value: false}, {key: 'j', value: false}, {key: 'k', value: false},{key: 'l', value: false},{key: 'ñ', value: false},
  {key: 'z', value: false}, {key: 'x', value: false}, {key: 'c', value: false},{key: 'v', value: false},{key: 'b', value: false},
  {key: 'n', value: false}, {key: 'm', value: false}];

  getUsuarios(): Observable<Usuario[]>{
    return collectionData(this.col, { idField: 'id'}) as Observable<Usuario[]>;
  }

  cargarUsuario(usuario:Usuario, lista:Usuario[]){

    // const documentoNuevo = doc(this.col);
    addDoc(this.col, Object.assign({}, usuario));
  }

  actualizarUsuarios(usuario:Usuario){

    const documento = doc(this.col, usuario.id);
    updateDoc(documento, {
      nombreUsuario: usuario.nombreUsuario,
      mail: usuario.mail,
      fechaIngreso: usuario.fechaIngreso,
      password: usuario.password,
    });
  }

  getMensajes(): Observable<Mensaje[]>{
    return collectionData(this.mensajesDB) as Observable<Mensaje[]>;
  }

  cargarChat(mensaje:Mensaje, lista:Mensaje[]){
    addDoc(this.mensajesDB, Object.assign({}, mensaje));
  }
}