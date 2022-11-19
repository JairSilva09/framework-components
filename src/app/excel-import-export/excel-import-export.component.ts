import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-import-export',
  templateUrl: './excel-import-export.component.html',
  styleUrls: ['./excel-import-export.component.scss']
})

export class ExcelImportExportComponent implements OnInit {
  
  fileName = 'ExcelSheet.xlsx';

  constructor() { }

  ngOnInit(): void {
  }

  

}
