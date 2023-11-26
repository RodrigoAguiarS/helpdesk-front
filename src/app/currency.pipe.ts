import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) {
      return '';
    }

    const cleanValue = typeof value === 'string' ? value.replace(/[^\d\.]/g, '') : value.toString();
    const [integerPart, decimalPart = '00'] = cleanValue.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const truncatedDecimalPart = decimalPart.slice(0, 2).padEnd(2, '0');
    const formattedValue = `R$ ${formattedIntegerPart},${truncatedDecimalPart}`;

    return formattedValue;
  }
}