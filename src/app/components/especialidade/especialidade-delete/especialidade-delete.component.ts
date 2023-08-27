import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from 'src/app/models/especialidade';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-especialidade-delete',
  templateUrl: './especialidade-delete.component.html',
  styleUrls: ['./especialidade-delete.component.css']
})
export class EspecialidadeDeleteComponent implements OnInit {

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

  delete(): void {
    this.especialidadeService.delete(this.especialidade.id).subscribe(() => {
      this.mensagemService.showSuccessoMensagem('Especialidade deletado com sucesso');
      this.router.navigate(['especialidades'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.mensagemService.showErrorMensagem(element.message);
        });
      } else {
        this.mensagemService.showErrorMensagem(ex.error.message);
      }
    })
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
