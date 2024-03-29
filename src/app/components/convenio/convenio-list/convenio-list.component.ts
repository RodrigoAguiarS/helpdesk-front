import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Convenio } from 'src/app/models/convenio';
import { ConvenioService } from 'src/app/services/convenio.service';


@Component({
  selector: 'app-convenio-list',
  templateUrl: './convenio-list.component.html',
  styleUrls: ['./convenio-list.component.css']
})
export class ConvenioListComponent implements OnInit {

  ELEMENT_DATA: Convenio[] = []

  displayedColumns: string[] = ['id', 'nome', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<Convenio>(this.ELEMENT_DATA);

  constructor(private convenioService: ConvenioService) { }

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
      this.dataSource = new MatTableDataSource<Convenio>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Convenio) => {
      const situacaoUsuario = this.retornaSituacao(data.ativo).toLowerCase();
      return situacaoUsuario.includes(filterValue);
    };
    this.dataSource.filter = filterValue;
  }

  retornaSituacao(ativo: boolean): string {
    return ativo ? 'ATIVO' : 'DESATIVADO';
  }
}