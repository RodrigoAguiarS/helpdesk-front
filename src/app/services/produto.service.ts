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

  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${API_CONFIG.baseUrl}/api/produtos`, produto);
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/api/produtos`);
  }

  buscarProdutosPorNome(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`/api/produtos/buscar${nome}`);
  }

  buscarProdutosCodigoBarras(codigoBarras: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`/api/produtos/produtos/${codigoBarras}`);
  }

  verificarEstoque(id: number): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/api/produtos/${id}/estoque`);
  }
}
