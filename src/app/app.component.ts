import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'framework-components';

  ngOnInit(): void {
   
  }

  evento(e: any){
    console.log(e.buttons)
   
  }

}
