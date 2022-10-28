import { Component, Input, OnInit,Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() total_pages: string="";
  @Input() current_page: string="";

  @Output() newPage = new EventEmitter();


  

  constructor() { }

  ngOnInit(): void {
  }

  nextPage(){

    let nextPage = Number(this.current_page);   
    nextPage = nextPage + 1; 
    this.newPage.emit(nextPage);  

  }

  previusPage(){

    let previusPage = Number(this.current_page);   
    previusPage = previusPage - 1; 
    this.newPage.emit(previusPage);
    
  }

}
