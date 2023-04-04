import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venda } from '../models/venda';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http: HttpClient) { }

  finalizarVenda(venda: any) {
    return this.http.post<Venda>(`${API_CONFIG.baseUrl}/api/vendas/`, venda);
  }
}
