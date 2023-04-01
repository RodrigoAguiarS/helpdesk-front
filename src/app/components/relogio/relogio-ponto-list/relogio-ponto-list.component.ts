import { RelogioPonto } from './../../../models/relogioPonto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RelogioService } from 'src/app/services/relogio.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-relogio-ponto-list',
  templateUrl: './relogio-ponto-list.component.html',
  styleUrls: ['./relogio-ponto-list.component.css']
})
export class RelogioPontoListComponent implements OnInit {

  ELEMENT_DATA: RelogioPonto[] = []

  displayedColumns: string[] = ['id', 'data registro', 'hora entrada', 'hora saída', 'pornto registrado', 'observações'];
  dataSource = new MatTableDataSource<RelogioPonto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: RelogioService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<RelogioPonto>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}