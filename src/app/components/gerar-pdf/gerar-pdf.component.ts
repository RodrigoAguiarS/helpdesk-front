import { Endereco } from './../../models/endereco';
import { TableService } from './../../services/table.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerar-pdf',
  templateUrl: './gerar-pdf.component.html',
  styleUrls: ['./gerar-pdf.component.css']
})
export class GerarPdfComponent implements OnInit {

  filtroForm: FormGroup;

  selectedOption: number = 0;

  ELEMENT_DATA: Endereco[] = []

  constructor(
    private pdfService: TableService,
    private fb: FormBuilder,
    private toastService: ToastrService) { }

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      selectedOption: [0, Validators.required]
    });
    this.filtroForm.get('selectedOption').valueChanges.subscribe(selectedOption => {
      switch (selectedOption) {
        case 'Estado':
          this.filtroForm.get('cidade').setValue('');
          this.filtroForm.get('bairro').setValue('');
          break;
        case 'Cidade':
          this.filtroForm.get('estado').setValue('');
          this.filtroForm.get('bairro').setValue('');
          break;
        case 'Bairro':
          this.filtroForm.get('estado').setValue('');
          this.filtroForm.get('cidade').setValue('');
          break;
      }
    });
  }

  pesquisar() {
    const estado = this.filtroForm.get('estado').value || '';
    const bairro = this.filtroForm.get('bairro').value || '';
    const cidade = this.filtroForm.get('cidade').value || '';

    if (!estado && !bairro && !cidade) {
      this.toastService.error('Preencha pelo menos um campo para realizar a pesquisa.');
      return;
    }
    const filtro = this.filtroForm.get('selectedOption').value;
    this.consultarLideres(estado, cidade, bairro, filtro);
  }

  consultarLideres(estado: string, cidade: string, bairro: string, filtro: string) {
    try {
      this.pdfService.pesquisarLideres(estado, cidade, bairro).subscribe((data) => {
        if (data.length === 0) {
          this.toastService.warning('A busca não obteve resultados.');
          return;
        }
        this.gerarRelatorioPDF(data, filtro);
      });
    } catch (error) {
      this.toastService.error('Erro ao gerar relatório');
    }
  }

  gerarRelatorioPDF(lideres: any[], filtro: string) {
    const doc = new jsPDF();
    const tableColumn = ['Nome', 'Telefone', 'Estado', 'Cidade', 'Bairro'];
    const tableRows = [];
    doc.setFontSize(16);
    doc.text(`Relatório de Líderes por ${filtro}`, 14, 22);
    doc.setFontSize(12);
    const totalRows = lideres.length;
    doc.text(`Total de Registros: ${totalRows}`, doc.internal.pageSize.width - 15, 22, { align: 'right' });
    const newStartY = 30;
    lideres.forEach(lider => {
      const liderData = [
        lider.nome,
        lider.celular,
        lider.endereco.estado,
        lider.endereco.cidade,
        lider.endereco.bairro,
      ];
      tableRows.push(liderData);
    });
    doc.autoTable(tableColumn, tableRows, { startY: newStartY });
    doc.save('lideres.pdf');
    this.toastService.success('Sucesso ao gerar relatório');
  }
}
