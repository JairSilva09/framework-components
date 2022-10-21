import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  numItems: number= 10;
  title = 'framework-components';
  ITEMS: any[] = [];

  ngOnInit(): void {
    this.loopItems(this.numItems);
  }

  loopItems(i: number){    
    for (let index = 0; index < i; index++) {
      this.ITEMS.push(
        {
          "title": "Item "+(index+1),
          "description": "this is a description of the item "+(index+1)
        }        
      )    
    }
  }
}
