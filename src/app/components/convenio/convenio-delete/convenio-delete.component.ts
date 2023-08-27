import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Convenio } from 'src/app/models/convenio';
import { ConvenioService } from 'src/app/services/convenio.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-convenio-delete',
  templateUrl: './convenio-delete.component.html',
  styleUrls: ['./convenio-delete.component.css']
})
export class ConvenioDeleteComponent implements OnInit {

  convenio: Convenio;

  constructor(
    private convernioService: ConvenioService,
    private mensagemService:    MensagemService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.convenio = new Convenio();
    this.convenio.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.convernioService.findById(this.convenio.id).subscribe(resposta => {
      this.convenio = resposta;
    })
  }

  delete(): void {
    this.convernioService.delete(this.convenio.id).subscribe(() => {
      this.mensagemService.showSuccessoMensagem('Convênio deletado com sucesso');
      this.router.navigate(['convenios'])
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

  retornaStatus(status: boolean): string {
    return status ? "ATIVAR" : "DESATIVADO";
  }
}

