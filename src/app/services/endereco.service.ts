import { Injectable } from '@angular/core';
import { EnderecoResposta } from '../models/enderecoReposta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  buscaEnderecoPorCep(cep: string): Observable<EnderecoResposta> {
    return this.http.get<EnderecoResposta>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
