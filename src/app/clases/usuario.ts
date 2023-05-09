export class Usuario {
    
    mail: string;
    password: string;
    nombreUsuario: string;
    fechaIngreso: Date;

    constructor(nombreUsuario:string, mail:string, password:string){
        this.nombreUsuario = nombreUsuario;
        this.mail = mail;
        this.password = password;
        this.fechaIngreso = new Date();
    }
}
