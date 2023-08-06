import { Especialidade } from './../models/especialidade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${API_CONFIG.baseUrl}/api/especialidades`);
  }
}
