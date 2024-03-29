import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convenio } from '../models/convenio';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  constructor(private http: HttpClient) { }

  create(convenio: Convenio): Observable<Convenio> {
    return this.http.post<Convenio>(`${API_CONFIG.baseUrl}/api/convenios`, convenio);
  }

  findAll(): Observable<Convenio[]> {
    return this.http.get<Convenio[]>(`${API_CONFIG.baseUrl}/api/convenios`);
  }

  update(convenio: Convenio): Observable<Convenio> {
    return this.http.put<Convenio>(`${API_CONFIG.baseUrl}/api/convenios/${convenio.id}`, convenio);
  }

  findById(id: any): Observable<Convenio> {
    return this.http.get<Convenio>(`${API_CONFIG.baseUrl}/api/convenios/${id}`);
  }

  delete(id: any): Observable<Convenio> {
    return this.http.delete<Convenio>(`${API_CONFIG.baseUrl}/api/convenios/${id}`);
  }
}
