import { Especialidade } from './../../../models/especialidade';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/models/medico';
import { MedicoService } from 'src/app/services/medico.service';


@Component({
  selector: 'app-medico-list',
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.css']
})
export class MedicoListComponent implements OnInit {

  ELEMENT_DATA: Medico[] = []
  FILTERED_DATA: Medico[] = []

  especialidades: Especialidade[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'email', 'crm', 'especialidade', 'acoes'];
  dataSource = new MatTableDataSource<Medico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.medicoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Medico>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Medico) => {
      const especialidadeNome = data.especialidade?.nome?.toLowerCase() || '';
      const nomeMedico = data.nome?.toLowerCase() || '';
      const cpfMedico = data.cpf?.toLowerCase() || '';
      const telefoneMedico = data.telefone?.toLowerCase() || '';
      const emailMedico = data.email?.toLowerCase() || '';
      const crmMedico = data.crm?.toLowerCase() || '';
  
      return (
        especialidadeNome.includes(filterValue.trim().toLowerCase()) ||
        nomeMedico.includes(filterValue.trim().toLowerCase()) ||
        cpfMedico.includes(filterValue.trim().toLowerCase()) ||
        telefoneMedico.includes(filterValue.trim().toLowerCase()) ||
        emailMedico.includes(filterValue.trim().toLowerCase()) ||
        crmMedico.includes(filterValue.trim().toLowerCase())
      );
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}  
