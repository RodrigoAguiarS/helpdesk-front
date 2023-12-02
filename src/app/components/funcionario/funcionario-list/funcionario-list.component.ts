import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {

  ELEMENT_DATA: Funcionario[] = []
  FILTERED_DATA: Funcionario[] = []

  displayedColumns: string[] = ['id', 'nome', 'cargo', 'salario', 'dataAdmissao', 'departamento', 'gestor', 'acoes'];
  dataSource = new MatTableDataSource<Funcionario>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private funcionarioService: FuncionarioService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.funcionarioService.findAllFuncinarios().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      console.log(this.ELEMENT_DATA )
      this.dataSource = new MatTableDataSource<Funcionario>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
