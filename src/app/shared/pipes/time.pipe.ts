import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number|undefined): string|undefined {
    let h=Math.floor(Number(value)/60);
    let m=Number(value)%60;
    console.log('h=',h);
    console.log('m',m);
    
    
   // let ft= `0${Math.floor(h)}:${Math.floor(m/10)}${m%10}`
   let ft=``
   if(h==0)
    {
         ft=` ${m}  דק'`
    }
    else{
      if(m==0)
         ft=`שעות ${h}`
      else
      ft=`${h} שעות ו${m} דק' `
    }
    console.log(ft);;
    
   return  ft

   
  }

}
