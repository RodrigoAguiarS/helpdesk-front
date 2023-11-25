import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResponsavelDepartamento } from 'src/app/models/responsavelDepartamento';
import { ResponsavelDepartamentoService } from 'src/app/services/responsavel-departamento.service';

@Component({
  selector: 'app-reponsavel-departamento-list',
  templateUrl: './responsavel-departamento-list.component.html',
  styleUrls: ['./responsavel-departamento-list.component.css']
})
export class ResponsavelDepartamentoListComponent implements OnInit {

  ELEMENT_DATA: ResponsavelDepartamento[] = []

  displayedColumns: string[] = ['id','departamento', 'responsavel', 'cargo', 'dataInicioResponsabilidade', 'dataFimResponsabilidade', 'acoes'];
  dataSource = new MatTableDataSource<ResponsavelDepartamento>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private reponsavelDepartamentoservice: ResponsavelDepartamentoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.reponsavelDepartamentoservice.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<ResponsavelDepartamento>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
