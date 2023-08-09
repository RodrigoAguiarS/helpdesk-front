import { TecnicoService } from "src/app/services/tecnico.service";
import { Component, OnInit } from "@angular/core";
import { Tecnico } from "src/app/models/tecnico";
import { AuthService } from "src/app/services/auth.service";
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: "",
  };

  roles: string[] = [];

  constructor(
    public tecnicoService: TecnicoService,
    private authService: AuthService,
    private toast:    ToastrService,
  ) {}

  ngOnInit() {
    // Faz as duas chamadas HTTP simultaneamente e aguarda até que ambas sejam concluídas
    forkJoin([
      this.authService.getUserRoles(),
      this.tecnicoService.ObterDadosUsuario(),
    ]).subscribe(
      ([roles, tecnico]) => {
        this.roles = roles;
        this.tecnico = tecnico;
      },
      (error) => {
        this.toast.error('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }
}
