import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  toggleSidebar:EventEmitter<boolean> = new EventEmitter<boolean>();
}
