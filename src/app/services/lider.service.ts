import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Lider } from '../models/lider';

@Injectable({
  providedIn: 'root'
})
export class LiderService {

  constructor(private http: HttpClient) { }

  create(lider: Lider): Observable<Lider> {
    return this.http.post<Lider>(`${API_CONFIG.baseUrl}/api/lideres`, lider);
  }

  getQuantidadeLideres(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/api/lideres/quantidade`);
  }

  findAll(): Observable<Lider[]> {
    return this.http.get<Lider[]>(`${API_CONFIG.baseUrl}/api/lideres`);
  }

  update(lider: Lider): Observable<Lider> {
    return this.http.put<Lider>(`${API_CONFIG.baseUrl}/api/lideres/${lider.id}`, lider);
  }

  findById(id: any): Observable<Lider> {
    return this.http.get<Lider>(`${API_CONFIG.baseUrl}/api/lideres/${id}`);
  }

  delete(id: any): Observable<Lider> {
    return this.http.delete<Lider>(`${API_CONFIG.baseUrl}/api/lideres/${id}`);
  }
}
