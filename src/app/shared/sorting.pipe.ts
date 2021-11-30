import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: IProduct[], type: string): any {
    return products.filter(prod => {
      return prod.type == type
    })
  }

}
