export class Mensaje {
    autor:string;
    mensaje:string;
    fecha:string;

    constructor(autor:string, mensaje:string){
        this.autor = autor;
        this.mensaje = mensaje;
        let fechaAux = new Date();
        this.fecha = fechaAux.getHours() + ":" + fechaAux.getMinutes() + " - " + fechaAux.getDay() + "/" + fechaAux.getMonth() + "/" + fechaAux.getFullYear();
    }
}
