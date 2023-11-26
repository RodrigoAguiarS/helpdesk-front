import { Departamento } from 'src/app/models/departamento';
import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-departamento-delete',
  templateUrl: './departamento-delete.component.html',
  styleUrls: ['./departamento-delete.component.css']
})
export class DepartamentoDeleteComponent implements OnInit {

  departamento: Departamento;
  
  constructor(
    private departamentoService: DepartamentoService,
    private mensagemService: MensagemService,
    private router: Router,
    private route: ActivatedRoute
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

  // deletar Departamento.
  delete(): void {
    this.departamentoService.delete(this.departamento.id).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Departamento deletado com sucesso");
          this.router.navigate(["departamentos"]);
      },
      error: (ex) => {
        if (ex.error.status == 403) {
          this.mensagemService.showErrorMensagem("Usuário não tem Permissão " + ex.error.message);
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      }
    });
  }
}
