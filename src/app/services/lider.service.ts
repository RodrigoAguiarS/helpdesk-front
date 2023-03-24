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
}
