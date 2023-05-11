export class Usuario implements Usuario{
    
    id: string;
    mail: string;
    password: string;
    nombreUsuario: string;
    fechaIngreso: Date;

    constructor(id: string, nombreUsuario:string, mail:string, password:string){
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.mail = mail;
        this.password = password;
        this.fechaIngreso = new Date();
    }
}
