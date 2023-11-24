import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.css']
})
export class DepartamentoListComponent implements OnInit {

  ELEMENT_DATA: Departamento[] = []
  FILTERED_DATA: Departamento[] = []

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'dataCriacao', 'acoes'];
  dataSource = new MatTableDataSource<Departamento>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.departamentoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Departamento>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
