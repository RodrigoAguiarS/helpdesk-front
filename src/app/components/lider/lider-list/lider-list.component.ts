import { TableService } from './../../../services/table.service';
import { Endereco } from './../../../models/endereco';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lider } from 'src/app/models/lider';
import { LiderService } from 'src/app/services/lider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-lider-list",
  templateUrl: "./lider-list.component.html",
  styleUrls: ["./lider-list.component.css"],
})
export class LiderListComponent implements OnInit {
  ELEMENT_DATA: Lider[] = [];
  FILTERED_DATA: Endereco[] = [];

  displayedColumns: string[] = [
    "id",
    "nome",
    "email",
    "celular",
    "whatsapp",
    "cep",
    "rua",
    "numero",
    "bairro",
    "cidade",
    "estado",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Lider>(this.ELEMENT_DATA);

  constructor(
    private service: LiderService,
    private tableService: TableService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {}

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Lider>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportarPDF() {
    this.tableService
      .generatePDFReportForLider(this.ELEMENT_DATA)
      .then((pdfBlob: Blob) => {
        this.toastService.success("Sucesso ao gerar relatório");
      })
      .catch((error: any) => {
        console.log("Error generating PDF:", error);
        this.toastService.error("Erro ao gerar relatório");
      });
  }
}
