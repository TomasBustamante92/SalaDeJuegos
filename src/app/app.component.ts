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

  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = "transparent";
  }

  ngOnInit(): void {

    if(this.primeraVez){

      this.servicioUsuario.getUsuarios().subscribe( usuariosFirebase => {
        this.servicioUsuario.setUsuarios(Object.values(usuariosFirebase));
      });
    }

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

