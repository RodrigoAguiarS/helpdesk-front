import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private toast: ToastrService) {}

  showSuccessoMensagem(message: string): void {
    this.toast.success(message);
  }

  showErrorMensagem(message: string): void {
    this.toast.error(message);
  }
}