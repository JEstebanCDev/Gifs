import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor( private historialSearch:GifsService){}

  get historial(){
    return this.historialSearch.getHistorial;
  }
  buscar(termino:string){
    this.historialSearch.buscarGifs(termino);
  }

}
