import { TecnicoService } from 'src/app/services/tecnico.service';
import { Component, OnInit } from "@angular/core";
import { Tecnico } from "src/app/models/tecnico";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  tecnico: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  isAdm: boolean;

  constructor(public tecnicoService: TecnicoService) {}

  ngOnInit(): void {
    this.verificarPerfilAdm();
    this.tecnicoService.ObterDadosUsuario().subscribe(
      (tecnico: Tecnico) => {
        this.tecnico = tecnico;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  verificarPerfilAdm(): void {
    this.tecnicoService.verificarPerfilAdm().subscribe(
      (isAdm: boolean) => {
        this.isAdm = isAdm;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
