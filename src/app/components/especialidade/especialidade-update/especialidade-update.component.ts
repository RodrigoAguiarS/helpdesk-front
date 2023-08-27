import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from 'src/app/models/especialidade';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-especialidade-update',
  templateUrl: './especialidade-update.component.html',
  styleUrls: ['./especialidade-update.component.css']
})
export class EspecialidadeUpdateComponent implements OnInit {

  especialidade: Especialidade;

  constructor(
    private especialidadeService: EspecialidadeService,
    private mensagemService: MensagemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  nome: FormControl = new FormControl(Validators.required, Validators.maxLength(50));

  ngOnInit(): void {
    this.especialidade = new Especialidade();
    this.especialidade.nome = this.nome.value;
    this.especialidade.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.especialidadeService.findById(this.especialidade.id).subscribe((resposta) => {
      this.especialidade = resposta;
    });
  }

  update(): void {
    this.especialidadeService.update(this.especialidade).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Especialidades atualizado com sucesso");
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
      },
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
