import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Convenio } from 'src/app/models/convenio';
import { ConvenioService } from 'src/app/services/convenio.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-convenio-create',
  templateUrl: './convenio-create.component.html',
  styleUrls: ['./convenio-create.component.css']
})
export class ConvenioCreateComponent implements OnInit {

  convenio: Convenio;

  constructor(private convenioService: ConvenioService,
              private mensagemService: MensagemService,
              private router: Router) { }

  nome: FormControl = new FormControl(Validators.required, Validators.maxLength(50));

  ngOnInit(): void {
    this.convenio = new Convenio();

  }

  create(): void {
    this.convenio.nome = this.nome.value;
    this.convenioService.create(this.convenio).subscribe({
      next: (resposta) => {
        console.log(resposta);
        this.mensagemService.showSuccessoMensagem("Convênio cadastrado com sucesso");
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
