
import { FormControl, Validators } from '@angular/forms';
import { EspecialidadeService } from '../../../services/especialidade.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Especialidade } from 'src/app/models/especialidade';
import { Medico } from 'src/app/models/medico';
import { MedicoService } from 'src/app/services/medico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrls: ['./medico-create.component.css']
})
export class MedicoCreateComponent implements OnInit {

  medico: Medico = {
    id:         '',
    nome:       '',
    cpf:        '',
    telefone:   '',
    crm:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    especialidade: null,
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  crm: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  telefone: FormControl = new FormControl(null, Validators.required);
  especialidade:    FormControl = new FormControl(null, [Validators.required]);

  especialidades: Especialidade[] = []

  constructor(private especialidadeService: EspecialidadeService,
              private medicoService: MedicoService,
              private toast:    ToastrService,
              private router:          Router,) { }

  ngOnInit(): void {
    this.findAllEspecialidades();
  }

  findAllEspecialidades(): void {
    this.especialidadeService.findAll().subscribe(resposta => {
      this.especialidades = resposta;
    })
  }

  create(): void {
    this.medicoService.create(this.medico).subscribe(resposta => {
      this.toast.success('Médico criado com sucesso', 'Novo medico');
      this.router.navigate(['medicos']);
    }, ex => {
      console.log(ex);
      
      this.toast.error(ex.error.error);
    })
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.crm.valid 
       && this.email.valid && this.especialidade.valid && this.senha.valid
       && this.telefone.valid
  }
}
