import { LiderService } from 'src/app/services/lider.service';
import { Component, OnInit } from '@angular/core';
import { Lider } from 'src/app/models/lider';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lider-delete',
  templateUrl: './lider-delete.component.html',
  styleUrls: ['./lider-delete.component.css']
})
export class LiderDeleteComponent implements OnInit {

  public lider: Lider = {
    id: '',
    nome: '',
    email: '',
    celular: '',
    whatsapp: false,
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  };

  constructor(
    private service: LiderService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.lider.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

   findById(){
    this.service.findById(this.lider.id).subscribe(resposta => {
      this.lider = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.lider.id).subscribe(() => {
      this.toast.success('Lider deletado com sucesso', 'Delete');
      this.router.navigate(['lideres'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
}
