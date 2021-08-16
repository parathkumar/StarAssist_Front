import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvancedDatepickerService {

  constructor() { }
  public selectedDates:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  setSeletedDates(dates:string[]){
    this.selectedDates.next([...dates]);
  }
}
