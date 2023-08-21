import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  ELEMENT_DATA: Usuario[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'clinica', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usuarioService: UsuarioService,
    ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.usuarioService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Usuario>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Usuario) => {
      const nomeUsuario = data.nome?.toLowerCase()|| '';
      const cpfUsuario = data.cpf?.toLowerCase()|| '';
      const emailUsuario = data.email?.toLowerCase()|| '';
      const clincaUsuario = data.clinica?.nome.toLowerCase()|| '';

      return (
        nomeUsuario.includes(filterValue) ||
        cpfUsuario.includes(filterValue) ||
        emailUsuario.includes(filterValue) ||
        clincaUsuario.includes(filterValue)
      );
    };
  
    this.dataSource.filter = filterValue;
  }
}
