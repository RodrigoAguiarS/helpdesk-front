import { Endereco } from './../../models/endereco';
import { TableService } from './../../services/table.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private toastService:    ToastrService) { }

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      selectedOption: [0, Validators.required]
    });
    this.filtroForm.get('selectedOption').valueChanges.subscribe(selectedOption => {
      switch (selectedOption) {
        case '0':
          this.filtroForm.get('cidade').setValue('');
          this.filtroForm.get('bairro').setValue('');
          break;
        case '1':
          this.filtroForm.get('estado').setValue('');
          this.filtroForm.get('bairro').setValue('');
          break;
        case '2':
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
  
    try {
      this.pdfService.pesquisarLideres(estado, cidade, bairro).subscribe((data) => {
        this.toastService.success('Sucesso ao gerar relátorio');
        const doc = new jsPDF();
        const tableColumn = ['Nome', 'Telefone', 'Estado', 'Cidade', 'Bairro'];
        const tableRows = [];
        doc.setFontSize(16);
        doc.text('Relatório de Líderes', 14, 22);
        const newStartY = 30;
        data.forEach(lider => {
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
      });
    } catch (error) {
      this.toastService.error('Erro ao gerar relatório');
    }
  }
}
