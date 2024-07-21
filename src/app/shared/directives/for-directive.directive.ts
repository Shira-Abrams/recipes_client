import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef ,Renderer2 ,OnChanges, SimpleChanges} from '@angular/core';
import { OnInit } from '@angular/core';
@Directive({
  selector: '[appForDirective]',
  standalone: true
})

export class ForDirectiveDirective implements OnChanges{
   
  @Input()
    appForDirective:number|undefined;
  
      
   constructor(private render: Renderer2, private viewContaine: ViewContainerRef) {}
  ngOnChanges(cahnge:SimpleChanges) {
    if(cahnge['appForDirective'])
      this.duplicateRank();
  }
  duplicateRank() {

   this.appForDirective=this.appForDirective||0;
   console.log('count=',this.appForDirective);
   this.viewContaine.clear();
   for (let index = 0; index < this?.appForDirective; index++) {
    const rank=this.render.createElement('img');
    this.render.setAttribute(rank,'src','../../../assets/star.png')
    this.render.appendChild(this.viewContaine.element.nativeElement,rank);
  }


  
     
 }



}
