import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {

  @Input() numLoops: any= 1;
  @Input() title: any= "";
  @Input() description: any= "";

  boxes: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loopsBoxes(this.numLoops);
  }

  loopsBoxes(i: any){
    let x = Number(i);
    for (let index = 0; index < i; index++) {
      this.boxes.push("box")    
    }
  }  

}
