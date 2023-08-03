import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { RelatorioAutitoria } from '../models/relatorioAutitoria';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  gerarRelatorio(relatorioUsuario: RelatorioAutitoria): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().set('Accept', 'application/pdf');
    const params = new HttpParams({ fromObject: relatorioUsuario as any });
    return this.http.get<Blob>(`${API_CONFIG.baseUrl}/api/relatorio/relatorio-usuario/`, {
      headers,
      params,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
}
