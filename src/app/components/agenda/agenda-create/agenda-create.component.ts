import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda-create',
  templateUrl: './agenda-create.component.html',
  styleUrls: ['./agenda-create.component.css']
})
export class AgendaCreateComponent implements OnInit {

  agenda: Agenda = {
    id: '',
    medico: null,
    horarioInicio: null,
    horarioFim: null, 
  };

  horarioInicio: FormControl = new FormControl(null, [Validators.required]);
  horarioFim:  FormControl = new FormControl(null, [Validators.required]);

  constructor(private agendaService: AgendaService,
    private toast:    ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  cadastrarAgenda() {
    if (this.agenda.horarioInicio && this.agenda.horarioFim &&
      this.agenda.horarioInicio > this.agenda.horarioFim) {
        console.log(this.agenda.horarioInicio)
        this.toast.warning('A Data de Início não pode ser posterior à Data de Fim', 'Erro');
      return;
      }
    if (!this.agenda.horarioInicio || !this.agenda.horarioFim) {
      console.log('As datas de início e fim devem ser preenchidas.');
      return;
    }
    this.agendaService.create(this.agenda).subscribe(
      response => {
        this.toast.success('Agenda cadastrada com sucesso:');
        this.router.navigate(['agendas']);
      },
      error => {
        this.toast.error(error.error.message);
      }
    );
  }
  
  validaCampos(): boolean {
    return this.horarioInicio.valid && this.horarioFim.valid
  }
}

