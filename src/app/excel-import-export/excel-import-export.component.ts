import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
//import { ExportedService } from './exported.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8';
const EXCEL_EXT = '.xlsx';

@Component({
  selector: 'app-excel-import-export',
  templateUrl: './excel-import-export.component.html',
  styleUrls: ['./excel-import-export.component.scss']
})

export class ExcelImportExportComponent implements OnInit {
  
  fileName = 'ExcelSheet.xlsx';
  @Input() data: any[] = [];

  @Output() dataImport = new EventEmitter();

  dataSource: any;
  dataJsonImport: any;

  isExcelFile!: boolean ;
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  export(): void{
    this.exportToExcel(this.data,'my_excel')

  }
  
  exportToExcel(dataJson: any[], fileName: string): void{
    
    const WORKSHEEET: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataJson);
    const WORKBOOK: XLSX.WorkBook = {
      Sheets: {
        "data": WORKSHEEET, 
      },
      SheetNames: ['data'],
    };

    const EXCELLBUFFER: any = XLSX.write(WORKBOOK,{bookType: 'xlsx',type: 'array'});

    this.saveAsExcel(EXCELLBUFFER,fileName)

  }

  private saveAsExcel(buffer: any, fileName: string): void{
    const DATA: Blob = new Blob([buffer],{type: EXCEL_TYPE});
    FileSaver.saveAs(DATA,fileName+EXCEL_EXT);
  }

  onChange(event: any){
    event.stopPropagation(); 
    event.preventDefault();   
    const target: DataTransfer = <DataTransfer>(event.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);
    console.log(target.files[0])
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }

    if(this.isExcelFile){     
 
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data:string = e.target.result;
          /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
        const workbook: XLSX.WorkBook = XLSX.read(data,{ type: 'binary' });          
      
          /* DO SOMETHING WITH workbook HERE */
          /* grab first sheet */
        const wsname: string = workbook.SheetNames[0];
        const ws: XLSX.WorkSheet = workbook.Sheets[wsname];
  
          /* save data */
        this.dataJsonImport = XLSX.utils.sheet_to_json(ws);
        this.dataImport.emit(this.dataJsonImport);      
      };
      reader.readAsArrayBuffer(target.files[0]);   
         
    }
  }

  removeFile(){
    let x = ""    
    this.inputFile.nativeElement.value = ""    
    this.dataImport.emit(x); 
    
  }

}
