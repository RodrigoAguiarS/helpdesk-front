import { ClinicaService } from 'src/app/services/clinica.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Clinica } from 'src/app/models/clinica';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-clinica-list',
  templateUrl: './clinica-list.component.html',
  styleUrls: ['./clinica-list.component.css']
})
export class ClinicaListComponent implements OnInit {

  ELEMENT_DATA: Clinica[] = []

  displayedColumns: string[] = [
  'id',
  'nome',
  'razaoSocial',
  'cnpj',
  'inscricaoEstadual',
  'inscricaoMunicipal',
  'responsavel',
  'cpfResponsavel',
  'ativo',
  'acoes'
];
  
  dataSource = new MatTableDataSource<Clinica>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clinicaService: ClinicaService,
    ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.clinicaService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Clinica>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Clinica) => {
      const nomeClinica = data.nome?.toLowerCase() || '';
      const cpfResponsavelClinica = data.cpfResponsavel?.toLowerCase() || '';
      const razaoSocialClinica = data.razaoSocial?.toLowerCase() || '';
      const inscricaoEstadualClinica = data.inscricaoEstadual?.toLowerCase() || '';
      const cnpjClinica = data.cnpj?.toLowerCase() || '';
      const inscricaoMunicipalClinica = data.inscricaoMunicipal?.toLowerCase() || '';
      const responsavelClinica = data.responsavel?.toLowerCase() || '';
      const ativoClinica = data.ativo ? 'ativo' : 'inativo';

      return (
        nomeClinica.includes(filterValue) ||
        cpfResponsavelClinica.includes(filterValue) ||
        razaoSocialClinica.includes(filterValue) ||
        inscricaoEstadualClinica.includes(filterValue) ||
        inscricaoMunicipalClinica.includes(filterValue) ||
        responsavelClinica.includes(filterValue) ||
        cnpjClinica.includes(filterValue) ||
        ativoClinica.includes(filterValue)
      );
    };
  
    this.dataSource.filter = filterValue;
  }
}
