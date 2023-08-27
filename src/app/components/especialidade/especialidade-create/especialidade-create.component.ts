import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidade } from 'src/app/models/especialidade';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-especialidade-create',
  templateUrl: './especialidade-create.component.html',
  styleUrls: ['./especialidade-create.component.css']
})
export class EspecialidadeCreateComponent implements OnInit {

  especialidade: Especialidade;

  constructor(private especialidadeService: EspecialidadeService,
              private mensagemService: MensagemService,
              private router: Router) { }

  nome: FormControl = new FormControl(Validators.required, Validators.maxLength(50));

  ngOnInit(): void {
    this.especialidade = new Especialidade();

  }

  create(): void {
    this.especialidade.nome = this.nome.value;
    this.especialidadeService.create(this.especialidade).subscribe({
      next: (resposta) => {
        console.log(resposta);
        this.mensagemService.showSuccessoMensagem("Especialidade cadastrado com sucesso");
        this.router.navigate(["especialidades"]);
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
      this.nome.valid 
    );
  }

  retornaStatus(status: boolean): string {
    return status ? "ATIVAR" : "DESATIVADO";
  }
}
