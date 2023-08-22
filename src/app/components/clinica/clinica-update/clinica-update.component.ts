import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinica } from 'src/app/models/clinica';
import { ClinicaService } from 'src/app/services/clinica.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-clinica-update',
  templateUrl: './clinica-update.component.html',
  styleUrls: ['./clinica-update.component.css']
})
export class ClinicaUpdateComponent implements OnInit {

  clinica: Clinica;

  nome: FormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  razaoSocial: FormControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  cnpj: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{14}$/)]);
  responsavel: FormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  cpfResponsavel: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]);
  inscricaoEstadual: FormControl = new FormControl('', [Validators.pattern(/^\d{12}$/)]);

  constructor(
    private clinicaService: ClinicaService,
    private mensagemService: MensagemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clinica = new Clinica();
    this.clinica.nome = this.nome.value;
    this.clinica.razaoSocial = this.razaoSocial.value;
    this.clinica.cnpj = this.cnpj.value;
    this.clinica.responsavel = this.responsavel.value;
    this.clinica.cpfResponsavel = this.cpfResponsavel.value;
    this.clinica.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.clinicaService.findById(this.clinica.id).subscribe((resposta) => {
      this.clinica = resposta;
    });
  }

  update(): void {
    this.clinicaService.update(this.clinica).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Clinica atualizado com sucesso");
        this.router.navigate(["clinicas"]);
      },
      error: (ex) => {
        console.log('Error occurred:', ex);
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.mensagemService.showErrorMensagem(element.message);
          });
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      },
    });
  }

  validaCampos(): boolean {
    console.log('Validation status:', this.nome.valid, this.cnpj.valid, this.responsavel.valid, this.razaoSocial.valid, this.cpfResponsavel.valid);
    return (
      this.nome.valid && this.cnpj.valid && this.responsavel.valid && this.razaoSocial.valid &&
      this.cpfResponsavel.valid
    );
  }

  retornaStatus(ativo: boolean): string {
    return ativo ? "CLINICA ATIVA" : "CLINICA NÃO ATIVA";
  }
}


