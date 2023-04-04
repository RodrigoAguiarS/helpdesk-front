import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumidor } from '../models/consumidor';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ConsumidorService {

  constructor(private http: HttpClient) { }

  getConsumidors(): Observable<Consumidor[]> {
    return this.http.get<Consumidor[]>(`${API_CONFIG.baseUrl}/api/consumidores`);
  }

  getConsumidorNome(name: string): Observable<any> {
    const params = { name };
    return this.http.get<any>(`${API_CONFIG.baseUrl}/api/consumidores/buscar/`, { params });
  }
}
