import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  numItems: number= 10;
  ITEMS: any[] = [];
  istokenReady = false;

  constructor() { }

  ngOnInit(): void {
    this.loopItems(this.numItems);
  
  }

  loopItems(i: number){    
    for (let index = 0; index < i; index++) {
      this.ITEMS.push(
        {
          "title": "Item "+(index+1),
          "description": "this is a description of the item "+(index+1),
          "image": "https://api.lorem.space/image/shoes?w=150&h=150"
        }        
      )    
    }
  }

}
