import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numerosEumaLetra'
})
export class NumerosEumaLetraPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return '';
    }
    const numeroRegex = /\d+/g; // regex para extrair apenas números
    const letrasRegex = /[a-zA-Z]/g; // regex para extrair apenas letras

    const numeros = value.match(numeroRegex)?.join(''); // extrai os números da string
    const letras = value.match(letrasRegex)?.slice(0, 1).join(''); // extrai a primeira letra da string

    return `${numeros}${letras}`;
  }
}