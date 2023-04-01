import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-modal-component',
  templateUrl: './confirmacao-modal-component.component.html',
  styleUrls: ['./confirmacao-modal-component.component.css']
})
export class ConfirmacaoModalComponent {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmacaoModalComponent>
  ) {
    if (data) {
      this.title = data.title || 'Confirmação';
      this.message = data.message || 'Salva comprovante de Registro?';
      this.confirmButtonText = data.confirmButtonText || 'Sim';
      this.cancelButtonText = data.cancelButtonText || 'Não';
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
