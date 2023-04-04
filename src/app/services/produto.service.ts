import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/api/produtos`);
  }

  buscarProdutos(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`/api/produtos/buscar${nome}`);
  }

  buscarProdutosCodigoBarras(codigoBarras: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`/api/produtos/produtos/${codigoBarras}`);
  }
}
