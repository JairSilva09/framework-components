import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @ViewChild('searchBar') searchBar!: ElementRef;

  @Output() search = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  
  ngAfterViewInit(){

    fromEvent(this.searchBar.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text: any) => {

          let search = this.searchBar.nativeElement.value;
         
          console.log(search)

          this.search.emit(search)

            //this.getWirelessBySearch(this.search)

        })
      )
    .subscribe();

  }

}
