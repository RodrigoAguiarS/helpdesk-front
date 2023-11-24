import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-departamento-update',
  templateUrl: './departamento-update.component.html',
  styleUrls: ['./departamento-update.component.css']
})
export class DepartamentoUpdateComponent implements OnInit {

  departamento: Departamento;

  // Definição dos formulários
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  descricao: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private departamentoService: DepartamentoService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.departamento = new Departamento();
    this.departamento.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.departamentoService.findById(this.departamento.id).subscribe((resposta) => {
      this.departamento = resposta;
    });
  }

  // adiciona perfil ao usuário
  update(): void {
    this.departamentoService.update(this.departamento).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Departamento atualizado com sucesso"
        );
        this.router.navigate(["departamentos"]);
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

  // Validação dos campos do formulário
  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.descricao.valid
    );
  }
}