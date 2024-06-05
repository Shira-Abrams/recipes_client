import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OnInit } from '@angular/core';
@Directive({
  selector: '[appForDirective]',
  standalone: true
})
export class ForDirectiveDirective implements OnInit{
   
  @Input()
  public set value(n : number) {
     this.count=n;
  }
  private count:number=5;
  
  constructor(private element:ElementRef) {
      console.log('directive count ',this.count);
      
  }
 
 

 ngOnInit(): void {
  console.log(this.element);
 console.log(this.count);
 
  let img=document.createElement('img')
  img.src="../../../assets/star.png"
  console.log('at for  directive');
  for (let index = 0; index < 5; index++) {
    this.element.nativeElement.appendChild(img)
  }
}



}
