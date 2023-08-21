import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inscricaoEstadualFormat'
})
export class InscricaoEstadualFormatPipe implements PipeTransform {
  transform(inscricaoEstadual: string): string {
    if (!inscricaoEstadual) return '';

    const inscricaoFormatted = inscricaoEstadual.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4');
    return inscricaoFormatted;
  }
}