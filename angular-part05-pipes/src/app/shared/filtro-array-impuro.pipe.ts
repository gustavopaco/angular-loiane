import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArrayImpuro',
  pure: false
})
export class FiltroArrayImpuroPipe implements PipeTransform {

  transform(array: any, args?: any): any {

    if (array.length === 0 || args === undefined) {
      return  array
    }
    let filtro = args.toLocaleLowerCase();

    return array.filter((valor: any )=> {
      return valor.toLocaleLowerCase().indexOf(filtro) !== -1;
    });
  }

}
