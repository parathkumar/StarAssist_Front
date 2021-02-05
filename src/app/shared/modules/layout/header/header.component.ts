import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleSidebarValue:boolean = false;
  constructor(private layoutService:LayoutService) { 
    
  }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSidebarValue = !this.toggleSidebarValue;
    this.layoutService.toggleSidebar.emit(this.toggleSidebarValue);
  }
}
