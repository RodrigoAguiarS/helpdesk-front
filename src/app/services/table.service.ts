import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_CONFIG } from '../config/api.config';
import { Lider } from '../models/lider';
import { RegistroPonto } from '../models/RegistroPonto';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: "root",
})
export class TableService {
  constructor(private http: HttpClient) {}
  produtos: Produto[];
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

  gerarPdfCompra(compra: any) {
    const doc = new jsPDF();
    const columns = ["Produto", "Quantidade", "Preço Unitário", "Preço Total"];
    const rows = [];
    for (const item of compra.itens) {
      rows.push([
        item.nomeProduto,
        item.quantidade,
        item.precoUnitario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
        (item.precoUnitario * item.quantidade).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      ]);
    }

    // Definir fonte e tamanho do título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Comprovante de Compra", 14, 20);

    // Definir fonte e tamanho da tabela
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });

    // Definir fonte e tamanho dos textos abaixo da tabela
    doc.setFontSize(10);
    doc.text(
      `Cliente: ${compra.nomeCliente}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Forma de pagamento: ${compra.pagamento}`,
      14,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(
      `Total a pagar: ${compra.valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`,
      14,
      doc.lastAutoTable.finalY + 30
    );
    // Definir cor do texto abaixo da tabela
    doc.setTextColor(255, 0, 0);
    doc.text("Obrigado pela compra!", 14, doc.lastAutoTable.finalY + 50);

    doc.save(`comprovante-compra-${new Date().toLocaleDateString()}.pdf`);
  }
}
