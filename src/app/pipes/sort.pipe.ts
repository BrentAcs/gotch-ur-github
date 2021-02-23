import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any, sortOn: string) {
    // console.log(value);
    // console.log(sortOn);
    if (sortOn.length === 0) {
      return value;
    }
    const result = value.sort((a, b) => {
      if (a[sortOn] < b[sortOn]) {
        return -1;
      }
      if (a[sortOn] > b[sortOn]) {
        return 1;
      }
      return 0;
    });
    return result;
  }
}
