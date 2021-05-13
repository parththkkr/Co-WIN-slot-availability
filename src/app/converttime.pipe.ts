import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converttime'
})
export class ConverttimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value/1000;
  }

}
