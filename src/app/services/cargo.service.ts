import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../models/cargo';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { DetalhesCargo } from '../models/detalhesCargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${API_CONFIG.baseUrl}/api/cargos/`);
  }

  create(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(`${API_CONFIG.baseUrl}/api/cargos/`, cargo);
  }

  findById(id: any): Observable<Cargo> {
    return this.http.get<Cargo>(`${API_CONFIG.baseUrl}/api/cargos/${id}`);
  }

  update(cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(`${API_CONFIG.baseUrl}/api/cargos/${cargo.id}`, cargo);
  }

  detalhesCargoById(id: any): Observable<DetalhesCargo> {
    return this.http.get<DetalhesCargo>(`${API_CONFIG.baseUrl}/api/cargos/detalhes/${id}`);
  }

  delete(id: any): Observable<Cargo> {
    return this.http.delete<Cargo>(`${API_CONFIG.baseUrl}/api/cargos/${id}`);
  }
}
