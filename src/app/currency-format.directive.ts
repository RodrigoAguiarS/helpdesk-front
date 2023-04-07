import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormat]',
})
export class CurrencyFormatDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Remove todos os caracteres que não são dígitos ou pontos
    const cleanValue = value.replace(/[^\d\.]/g, '');

    // Divide o valor em duas partes: a parte inteira e a parte decimal
    const [integerPart, decimalPart = ''] = cleanValue.split('.');

    // Formata a parte inteira com pontos a cada três dígitos
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Limita a parte decimal a dois dígitos
    const truncatedDecimalPart = decimalPart.slice(0, 2);

    // Combina as duas partes com uma vírgula como separador decimal
    const formattedValue = `${formattedIntegerPart},${truncatedDecimalPart}`;

    // Atualiza o valor no campo e no modelo
    this.el.nativeElement.value = formattedValue;
    this.control.control.setValue(formattedValue);
  }
}
