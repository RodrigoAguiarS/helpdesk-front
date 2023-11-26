import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Departamento } from 'src/app/models/departamento';
import { CargoService } from 'src/app/services/cargo.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-cargo-delete',
  templateUrl: './cargo-delete.component.html',
  styleUrls: ['./cargo-delete.component.css']
})
export class CargoDeleteComponent implements OnInit {

  cargo: Cargo;
  departamentos: Departamento[] = []

  constructor(
    private mensagemService: MensagemService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargo = new Cargo();
    this.cargo.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllDepartamentos();
  }

  findById(): void {
    this.cargoService.findById(this.cargo.id).subscribe((resposta) => {
      this. cargo = resposta;
    });
  }

  // deletar Departamento.
  delete(): void {
    this.cargoService.delete(this.cargo.id).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem("Cargo deletado com sucesso");
        this.router.navigate(['cargos'])
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

  findAllDepartamentos(): void {
    this.departamentoService.findAll().subscribe(resposta => {
      this.departamentos = resposta;
    })
  }
}

