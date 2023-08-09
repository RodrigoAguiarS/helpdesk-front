import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, map, startWith } from "rxjs";
import { RelatorioAutitoria } from "src/app/models/relatorioAutitoria";
import { Tecnico } from "src/app/models/tecnico";
import { RelatorioService } from "src/app/services/relatorio.service";
import { TecnicoService } from "src/app/services/tecnico.service";
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-relatorio-autitoria',
  templateUrl: './relatorio-autitoria.component.html',
  styleUrls: ['./relatorio-autitoria.component.css']
})

export class RelatorioUsuarioComponent implements OnInit {
  relatorioUsuario: RelatorioAutitoria = {
    idTecnico: 0,
    dataInicio: null,
    dataFim: null
  };

  datePipe = new DatePipe('pt-BR');

  tecnicos: Tecnico[] = [];
  filtroTecnicos: Observable<Tecnico[]>;
  tecnicoControl = new FormControl();
  tecnicoSelecionado: Tecnico | null = null;

  idTecnico: FormControl = new FormControl(null, [Validators.required]);
  dataInicio:    FormControl = new FormControl(null, [Validators.required]);
  dataFim:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private relatorioService: RelatorioService,
    private tecnicoService: TecnicoService,
    private toast:    ToastrService
  ) {}

  ngOnInit(): void {
    this.findAllTecnicos();
    this.filtroTecnicos = this.tecnicoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTecnicos(value))
    );
  }

  private _filterTecnicos(value: string | Tecnico): Tecnico[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value?.nome?.toLowerCase() || '';
    return this.tecnicos.filter(tecnico => tecnico.nome.toLowerCase().includes(filterValue));
  }


  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  displayTecnico(tec: Tecnico): string | null {
    console.log("Técnico selecionado:", tec);
    return tec ? tec.nome : null;
  }
  
  gerarRelatorio() {
    if (this.tecnicoSelecionado) {
      this.relatorioUsuario.idTecnico = this.tecnicoSelecionado.id;
    }
    // Validar se a data de início não é posterior à data de fim
    if (this.relatorioUsuario.dataInicio && this.relatorioUsuario.dataFim &&
      this.relatorioUsuario.dataInicio > this.relatorioUsuario.dataFim) {
      this.toast.warning('A Data de Início não pode ser posterior à Data de Fim', 'Erro');
      return;
    }

    console.log("Valor de relatorioUsuario:", this.relatorioUsuario);
    this.relatorioService.gerarRelatorio(this.relatorioUsuario).subscribe(
      (response: HttpResponse<Blob>) => {
        console.log(response);
        this.toast.success('Relatório gerado com sucesso', 'Relatório');
        this.downloadRelatorio(response);
        this.limparCampos();
      },
      (error) => {
        this.toast.error(error.error.message);
      }
    );
  }

  private downloadRelatorio(response: HttpResponse<Blob>) {
    const filename = "relatorio_usuario.pdf";
    const blob = new Blob([response.body], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  validaCampos(): boolean {
    return this.dataInicio.valid && this.dataFim.valid && this.tecnicoSelecionado !== null
  }

  limparCampos() {
    this.tecnicoControl.reset();
    this.dataInicio.reset();
    this.dataFim.reset();
    this.idTecnico.reset();
    this.tecnicoSelecionado = null;
    this.relatorioUsuario.idTecnico = null;
    this.relatorioUsuario.dataInicio = null;
    this.relatorioUsuario.dataFim = null;
  }
}