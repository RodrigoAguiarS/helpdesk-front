import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clinica } from 'src/app/models/clinica';
import { ClinicaService } from 'src/app/services/clinica.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-clinica-create',
  templateUrl: './clinica-create.component.html',
  styleUrls: ['./clinica-create.component.css']
})
export class ClinicaCreateComponent implements OnInit {

  clinica: Clinica;

  constructor(private clinicaService: ClinicaService,
    private mensagemService: MensagemService,
    private router: Router) { }

  nome: FormControl = new FormControl(Validators.required, Validators.maxLength(50));
  razaoSocial: FormControl = new FormControl(Validators.required, Validators.maxLength(100));
  cnpj: FormControl = new FormControl(Validators.required, Validators.pattern(/^\d{14}$/));
  responsavel: FormControl = new FormControl(Validators.required, Validators.maxLength(50))
  cpfResponsavel: FormControl = new FormControl(Validators.required, Validators.pattern(/^\d{11}$/));
  inscricaoEstadual: FormControl = new FormControl(Validators.pattern(/^\d{12}$/));


  ngOnInit(): void {
    this.clinica = new Clinica();
  }

  create(): void {
    this.clinica.nome = this.nome.value;
    this.clinica.razaoSocial = this.razaoSocial.value;
    this.clinica.cnpj = this.cnpj.value;
    this.clinica.responsavel = this.responsavel.value;
    this.clinica.cpfResponsavel = this.cpfResponsavel.value;

    this.clinicaService.create(this.clinica).subscribe({
      next: (resposta) => {
        console.log(resposta);
        this.mensagemService.showSuccessoMensagem("Clinica cadastrado com sucesso");
        this.router.navigate(["home"]);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.mensagemService.showErrorMensagem(element.message);
          });
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      }
    });
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cnpj.valid && this.responsavel.valid && this.razaoSocial.valid &&
      this.cpfResponsavel.valid
    );
  }

  retornaStatus(ativo: boolean): string {
    return ativo ? "CLINICA ATIVO" : "CLINICA NÃO ATIVO";
  }
}
