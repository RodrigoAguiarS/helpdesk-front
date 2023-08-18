import { Agenda } from './../models/agenda';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  create(agenda: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(`${API_CONFIG.baseUrl}/api/agendas`, agenda);
  }

  findAll(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${API_CONFIG.baseUrl}/api/agendas`);
  }
}
