import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  empresa: Empresa;

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.ObterDadosEmpresa().subscribe(
      (empresa: Empresa) => {
        this.empresa = empresa;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
