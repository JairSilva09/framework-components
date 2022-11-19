import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8';
const EXCEL_EXT = '.xlsx';
@Injectable()
export class ExportedService {

  constructor() { }

  exportToexcel(dataJson: any[], fileNmae: string): void{
    
    const WORKSHEEET: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataJson);
    const WORKBOOK: XLSX.WorkBook = {
      Sheets: {
        "data": WORKSHEEET, 
      },
      SheetNames: ['data'],
    };

    const EXCELLBUFFER: any = XLSX.write(WORKBOOK,{bookType: 'xlsx',type: 'array'});

    this.saveAsExcel(EXCELLBUFFER,fileNmae)

  }

  private saveAsExcel(buffer: any, fileName: string): void{
    const DATA: Blob = new Blob([buffer],{type: EXCEL_TYPE});
    FileSaver.saveAs(DATA,fileName+'_export_'+new Date().getTime+EXCEL_EXT);

  }
}
