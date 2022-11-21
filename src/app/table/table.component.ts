import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  data: any= [];
  dataSource: any[] = [];
  imported: any;  
  observableSubs: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getDirectory();
  }

  ngOnDestroy(){ if (this.observableSubs) this.observableSubs.unsubscribe(); }

  getDirectory(): void{
    this.observableSubs = this.dataService.getDirectory().subscribe(    
      data => this.data = data,
      error => console.log(error),
    )  
    this.dataSource = this.data
  }

  searchBy(search: string){
    this.dataService.getDirectoryBySearch(search).subscribe(
      data => this.data = data,
      error => console.log(error),
    )
    this.dataSource = this.data    
  }

  importedData(data: any){   
    
    if(data != "" && data != undefined){

      let text = "";

      data.forEach((e:any) => {
        
        for (const key in e) {
          if (Object.prototype.hasOwnProperty.call(e, key)) {
            text += e[key]+" ";
          }
        }

        text += "\n"

      });

      this.imported = text; 
       
    }else{
      this.imported = "";
    }
       
  }

}
