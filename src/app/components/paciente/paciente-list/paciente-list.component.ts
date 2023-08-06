import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {

  ELEMENT_DATA: Paciente[] = [];

  displayedColumns: string[] = [
    "id",
    "nome",
    "email",
    "cpf",
    "telefone",
    "cep",
    "rua",
    "numero",
    "bairro",
    "cidade",
    "estado",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Paciente>(this.ELEMENT_DATA);

 
  constructor(
    private service: PacienteService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() { /* TODO document why this method 'ngAfterViewInit' is empty */ }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Paciente>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
}
