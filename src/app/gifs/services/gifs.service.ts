import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private api_key: string = 'iBtqrRX4R6Thxmm4UFXilsv7uhbZskAp';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get getHistorial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //forma de persistir la informacion
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      //Forma de guardar la informacion en cache del sistema
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    console.log(this._historial);

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this._servicioURL}/search`, { params })
      .subscribe((resp: any) => {
        //console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultados));
      });
  }
}
