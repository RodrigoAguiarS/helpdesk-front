import { Tecnico } from 'src/app/models/tecnico';
import { Observable } from 'rxjs';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/api/tecnicos`);
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/api/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/api/tecnicos/${tecnico.id}`, tecnico);
  }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/api/tecnicos/${id}`);
  }

  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}/api/tecnicos/${id}`);
  }
}
