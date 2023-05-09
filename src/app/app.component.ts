import { AfterViewInit, Component, ElementRef, OnInit  } from '@angular/core';
import { Usuario } from './clases/usuario';
import { ServicioUsuariosService } from './servicio-usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{

  constructor(private elementRef: ElementRef, private servicioUsuario:ServicioUsuariosService) {}
  
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = "transparent";
  }

  ngOnInit(): void {

    this.servicioUsuario.getUsuarios().subscribe( usuariosFirebase => {
      
      this.servicioUsuario.setUsuarios(Object.values(usuariosFirebase));

    });
  }
}

