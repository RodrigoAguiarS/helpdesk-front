import { TableService } from './../../../services/table.service';
import { Endereco } from './../../../models/endereco';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lider } from 'src/app/models/lider';
import { LiderService } from 'src/app/services/lider.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-lider-list',
  templateUrl: './lider-list.component.html',
  styleUrls: ['./lider-list.component.css']
})
export class LiderListComponent implements OnInit {

  ELEMENT_DATA: Lider[] = []
  FILTERED_DATA: Endereco[] = []

  displayedColumns: string[] = ['id', 'nome', 'email', 'celular', 'whatsapp', 'cep', 'rua',
  'numero', 'bairro', 'cidade', 'estado', 'acoes'];
  dataSource = new MatTableDataSource<Lider>(this.ELEMENT_DATA);

  constructor(private service: LiderService,
  private tableSerive: TableService) { }

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      console.log(resposta)
      this.dataSource = new MatTableDataSource<Lider>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportarPDF() {
    const tableColumns = ['Nome', 'Celular', 'Rua','Bairro', 'Cidade', 'Estado'];
    const doc = new jsPDF();
    this.tableSerive.findAll().subscribe(
      (tableData: any[]) => {
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
          console.log(dataRow)
        }
        doc.autoTable({
          head: [tableColumns],
          body: tableRows,
        });
        doc.save('tabela.pdf');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
