import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  typedString: string = 'ברוכים הבאים ל TOUCH-FOOD /אתר מתכונים שיתופי/  אתם מוזמנים להנות ממגון מתכונים ששותפו / וכמובן לשתף גם מהמתוכנים שלכם / בתאבון ובהצלחה !!';  
  initialIndex=0;
  intreduceString=''
  ngOnInit()  {
    this.simulateTyping()
  }
  simulateTyping()
  {
    

     const type=()=>{
      // console.log('at set time out the string to intreduce is = ',this.intreduceString);

      if(this.initialIndex<this.typedString.length) 
          {  
            if(this.typedString[this.initialIndex]=='/')
              {
                this.intreduceString+='<br>'
                this.initialIndex++;
              }
              
            else{
                           
                this.intreduceString+=this.typedString[this.initialIndex++]

            }
    
          }
          else{
            this.initialIndex=0;
            this.intreduceString=''
          }

          setTimeout(type, 70);
     }
     type();
  }
  
}
