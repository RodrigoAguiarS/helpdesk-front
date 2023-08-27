import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidade } from 'src/app/models/especialidade';
import { EspecialidadeService } from 'src/app/services/especialidade.service';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.component.html',
  styleUrls: ['./especialidade-list.component.css']
})
export class EspecialidadeListComponent implements OnInit {

  ELEMENT_DATA: Especialidade[] = []

  displayedColumns: string[] = ['id', 'nome', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<Especialidade>(this.ELEMENT_DATA);

  constructor(private convenioService: EspecialidadeService) { }

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // TODO document why this method 'ngAfterViewInit' is empty
  }

  findAll() {
    this.convenioService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Especialidade>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Especialidade) => {
      const situacaoUsuario = this.retornaSituacao(data.ativo).toLowerCase();
      return situacaoUsuario.includes(filterValue);
    };
    this.dataSource.filter = filterValue;
  }

  retornaSituacao(ativo: boolean): string {
    return ativo ? 'ATIVO' : 'DESATIVADO';
  }
}