import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = []

  displayedColumns: string[] = [
    "id",
    "nome",
    "telefone",
    "cep",
    "rua",
    "numero",
    "bairro",
    "cidade",
    "estado",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ClienteService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Cliente) => {
      const nomeCliente = data.nome?.toLowerCase()|| '';
      const telefoneCliente = data.telefone?.toLowerCase()|| '';
      const cepCliente = data.endereco.cep?.toLowerCase()|| '';
      const ruaCliente = data.endereco.rua?.toLowerCase()|| '';
      const numeroCliente = data.endereco.numero?.toLowerCase()|| '';
      const bairroCliente = data.endereco.bairro?.toLowerCase()|| '';
      const cidadeCliente = data.endereco.cidade?.toLowerCase()|| '';
      const estadoCliente = data.endereco.estado?.toLowerCase()|| '';
  
      return (
        nomeCliente.includes(filterValue) ||
        telefoneCliente.includes(filterValue) ||
        cepCliente.includes(filterValue) ||
        ruaCliente.includes(filterValue) ||
        numeroCliente.includes(filterValue) ||
        bairroCliente.includes(filterValue) ||
        cidadeCliente.includes(filterValue) ||
        estadoCliente.includes(filterValue)
      );
    };
  
    this.dataSource.filter = filterValue;
  }

}