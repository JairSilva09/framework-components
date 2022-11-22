import { Injectable } from '@angular/core';
import { DATA } from './mock-data';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDirectory(): Observable<any[]>{
    const directory =  of(DATA)
    return directory;
  }

  getDirectoryBySearch(search: any): Observable<any[]>{ 
    
    const result = DATA.filter(a => a.category === search || a.client === search)
    return  of(result)
  }

  getDirectorySort(sort: any): Observable<any[]>{
    console.log(sort)
    //this.carros.sort(((a, b) => a.modelo - b.modelo));
    const result = DATA.sort(((a, b) => a.sort - b.sort))
    return  of(result)
    
  }
}
