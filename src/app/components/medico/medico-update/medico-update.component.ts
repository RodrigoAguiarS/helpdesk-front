import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Especialidade } from "src/app/models/especialidade";
import { Medico } from "src/app/models/medico";
import { EspecialidadeService } from "src/app/services/especialidade.service";
import { MedicoService } from "src/app/services/medico.service";

@Component({
  selector: "app-medico-update",
  templateUrl: "./medico-update.component.html",
  styleUrls: ["./medico-update.component.css"],
})
export class MedicoUpdateComponent implements OnInit {
  medico: Medico = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
    crm: "",
    email: "",
    senha: "",
    perfis: [],
    especialidade: null,
  };

  especialidades: Especialidade[] = [];

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  crm: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  telefone: FormControl = new FormControl(null, Validators.required);
  especialidade: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private especialidadeService: EspecialidadeService,
    private medicoService: MedicoService,
    private toast: ToastrService,
    private router: Router,
    private route:   ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllEspecialidades();
  }


   findById(): void {
    this.medicoService.findById(this.medico.id).subscribe(resposta => {
      this.medico = resposta;
    })
  }

  update(): void {
    this.medicoService.update(this.medico).subscribe(
      () => {
        this.toast.success("Médico atualizado com sucesso", "Update");
        this.router.navigate(["medicos"]);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }

  findAllEspecialidades(): void {
    this.especialidadeService.findAll().subscribe((resposta) => {
      this.especialidades = resposta;
    });
  }

  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.cpf.valid &&
      this.crm.valid &&
      this.email.valid &&
      this.especialidade.valid &&
      this.senha.valid &&
      this.telefone.valid
    );
  }
}
