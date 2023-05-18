import { AfterViewInit, Component, ElementRef, OnInit  } from '@angular/core';
import { ServicioUsuariosService } from './servicio-usuarios.service';
import { Usuario } from './clases/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{

  constructor(private elementRef: ElementRef, private servicioUsuario:ServicioUsuariosService) {}
  
  usuario: Usuario;
  estaLogueado = false;
  primeraVez = true;
  usuariosFirebase: Usuario[];

  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = "transparent";
  }

  ngOnInit(): void {

    this.servicioUsuario.getUsuarios().subscribe(data => {
      this.servicioUsuario.setUsuarios(data);

      if(this.estaLogueado){
        data.forEach(data => {
          if(this.usuario.nombreUsuario == data.nombreUsuario){

            this.usuario = data;
            this.servicioUsuario.setUsuarioLogueado(data);
          }
        });
      }
    });

    this.servicioUsuario.getEstaLogueado$().subscribe(
      esta => {
        this.estaLogueado = esta;
      });

    this.servicioUsuario.getUsuarioLogueado$().subscribe(
      usuario => {
        this.usuario = usuario;
      });
  }

  logout(){
    this.servicioUsuario.setEstaLogueado$(false);
  }
}

