import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Lider } from '../models/lider';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Lider[]> {
    return this.http.get<Lider[]>(`${API_CONFIG.baseUrl}/api/lideres`);
  }

  public pesquisarLideres(estado: string, cidade: string, bairro: string): Observable<Lider[]> {
    const params = new HttpParams()
      .set('estado', estado)
      .set('cidade', cidade)
      .set('bairro', bairro);
    return this.http.get<Lider[]>(`${API_CONFIG.baseUrl}/api/lideres/buscar-lideres`, { params });
  }
}
