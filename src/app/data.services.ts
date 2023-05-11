import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "./clases/usuario";
import { doc, addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, setDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable()
export class DataServices{

  constructor(private httpClient: HttpClient, private firestore: Firestore){}
  col = collection(this.firestore, 'usuarios');

  getUsuarios(): Observable<Usuario[]>{
    return collectionData(this.col, { idField: 'id'}) as Observable<Usuario[]>;
  }

  cargarUsuario(usuario:Usuario, lista:Usuario[]){

    const documentoNuevo = doc(this.col);
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
}