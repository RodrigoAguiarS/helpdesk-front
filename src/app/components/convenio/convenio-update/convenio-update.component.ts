import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Convenio } from 'src/app/models/convenio';
import { ConvenioService } from 'src/app/services/convenio.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-convenio-update',
  templateUrl: './convenio-update.component.html',
  styleUrls: ['./convenio-update.component.css']
})
export class ConvenioUpdateComponent implements OnInit {

  convenio: Convenio;

  constructor(
    private convenioService: ConvenioService,
    private mensagemService: MensagemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  nome: FormControl = new FormControl(Validators.required, Validators.maxLength(50));

  ngOnInit(): void {
    this.convenio = new Convenio();
    this.convenio.nome = this.nome.value;
    this.convenio.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.convenioService.findById(this.convenio.id).subscribe((resposta) => {
      this.convenio = resposta;
    });
  }

  update(): void {
    this.convenioService.update(this.convenio).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Convênio atualizado com sucesso");
        this.router.navigate(["convenios"]);
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
