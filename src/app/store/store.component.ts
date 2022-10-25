import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  numItems: number= 10;
  ITEMS: any[] = [];
  istokenReady = false;

  constructor(private storeService:StoreService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.loopItems(this.numItems);
    setTimeout(() => {
      this.storeService.getToken().subscribe({
        next: (token: any) => {
          localStorage.setItem('token', token.token);
        },
        error: (err) => {
          console.log(err);
          console.error('Error getting token');
          this._snackBar.open('Error getting token', 'Close', {
            duration: 6000,
          });
          this.istokenReady = false;
        },
        complete: () => {
          console.log('token complete');
        }
      })
    }, 500);
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
