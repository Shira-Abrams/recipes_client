import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[appForDirective]',
  standalone: true
})
export class ForDirectiveDirective {
   
  @Input()
  public set value(n : number) {
     this.count=n;
  }
  private count:number=0;
  
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
      console.log('directive count ',this.count);
      
  }
 public duplicate()
 {
   this.viewContainer.clear();
   for (let index = 0; index <this.count; index++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
   }
 }

}
