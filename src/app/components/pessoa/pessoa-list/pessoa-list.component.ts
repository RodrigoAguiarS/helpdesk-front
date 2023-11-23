import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  ELEMENT_DATA: Usuario[] = []

  displayedColumns: string[] = [
    "id",
    "nome",
    "email",
    "cpf",
    "ativo",
    "telefone",
    "sexo",
    "cep",
    "rua",
    "numero",
    "bairro",
    "cidade",
    "estado",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pessoaService: PessoaService,
    ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.pessoaService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Usuario>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

   // metodo para filtrar todas as colunas da tabela.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Usuario) => {
      const nomeUsuario = data.pessoa.nome?.toLowerCase()|| '';
      const cpfUsuario = data.pessoa.cpf?.toLowerCase()|| '';
      const emailUsuario = data.email?.toLowerCase()|| '';
      const telefoneUsuario = data.pessoa.telefone?.toLowerCase()|| '';
      const sexoUsuario = data.pessoa.sexo?.toLowerCase()|| '';
      const cepUsuario = data.pessoa.endereco.cep?.toLowerCase()|| '';
      const numeroUsuario = data.pessoa.endereco.numero?.toLowerCase()|| '';
      const bairroUsuario = data.pessoa.endereco.bairro?.toLowerCase()|| '';
      const cidadeUsuario = data.pessoa.endereco.cidade?.toLowerCase()|| '';
      const estadoUsuario = data.pessoa.endereco.estado?.toLowerCase()|| '';

      return (
        nomeUsuario.includes(filterValue) ||
        cpfUsuario.includes(filterValue) ||
        emailUsuario.includes(filterValue) ||
        telefoneUsuario.includes(filterValue) ||
        sexoUsuario.includes(filterValue) ||
        cepUsuario.includes(filterValue) ||
        numeroUsuario.includes(filterValue) ||
        bairroUsuario.includes(filterValue) ||
        cidadeUsuario.includes(filterValue) ||
        estadoUsuario.includes(filterValue)
      );
    };
  
    this.dataSource.filter = filterValue;
  }
}
