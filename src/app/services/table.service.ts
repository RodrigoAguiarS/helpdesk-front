import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_CONFIG } from '../config/api.config';
import { Lider } from '../models/lider';
import { RegistroPonto } from '../models/RegistroPonto';

@Injectable({
  providedIn: "root",
})
export class TableService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Lider[]> {
    return this.http.get<Lider[]>(`${API_CONFIG.baseUrl}/api/lideres`);
  }

  public pesquisarLideres(
    estado: string,
    cidade: string,
    bairro: string
  ): Observable<Lider[]> {
    const params = new HttpParams()
      .set("estado", estado)
      .set("cidade", cidade)
      .set("bairro", bairro);
    return this.http.get<Lider[]>(
      `${API_CONFIG.baseUrl}/api/lideres/buscar-lideres`,
      { params }
    );
  }

  gerarPdf(registro: RegistroPonto) {
    const doc = new jsPDF();
    const columns = ["Data", "Hora", "Ponto Registrado", "Observações"];
    const data = [
      [
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString(),
        registro.pontoRegistrado ? "Entrada" : "Saída",
        registro.observacoes,
      ],
    ];
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20,
    });
    const fileName = `Registro de ponto ${new Date().toLocaleDateString()}.pdf`;
    doc.save(fileName);
    return of(null);
  }

  generatePDFReportForLider(lider: Lider[]): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      let totalRegistros = 0;
      const doc = new jsPDF();
      this.findAll().subscribe(
        (tableData: any[]) => {
          totalRegistros = tableData.length;
          const tableColumns = [
            "Nome",
            "Celular",
            "Rua",
            "Bairro",
            "Cidade",
            "Estado",
          ];
          const tableRows = [];
          for (const data of tableData) {
            const dataRow = [
              data.nome,
              data.celular,
              data.endereco.rua,
              data.endereco.bairro,
              data.endereco.cidade,
              data.endereco.estado,
            ];
            tableRows.push(dataRow);
          }
          tableRows.push([
            "",
            "",
            "",
            "",
            "Total de registros:",
            totalRegistros,
          ]);
          doc.autoTable({
            head: [tableColumns],
            body: tableRows,
          });
          const fileName = `Relatório de Indicados ${new Date().toLocaleDateString()}.pdf`;
          const pdfBlob = doc.output("blob");
          doc.save(fileName);
          resolve(pdfBlob);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
}
