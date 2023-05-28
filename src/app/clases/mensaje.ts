export class Mensaje {
    id:number
    autor:string;
    mensaje:string;
    fecha:string;

    constructor(id:number, autor:string, mensaje:string, fecha:string){
        this.id = id;
        this.autor = autor;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }
}
