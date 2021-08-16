import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { AdvancedDatepickerService } from 'src/app/modules/release-order/services/advanced-datepicker.service';
import { AdvancedDatepickerComponent } from '../advanced-datepicker.component';

@Component({
  selector: 'app-manual-multi-datepicker',
  templateUrl: './manual-multi-datepicker.component.html',
  styleUrls: ['./manual-multi-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManualMultiDatepickerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdvancedDatepickerComponent>,private selectedDaysService:AdvancedDatepickerService) { }

  ngOnInit(): void {
    this.selectedDaysService.selectedDates.subscribe(res=>this.daysSelected = res);
    console.log('manual',this.daysSelected)
  }
  @Input()
  daysSelected: any[] = [];
  event: any;
  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
  }
  saveSelectedDates(){
    this.selectedDaysService.setSeletedDates(this.daysSelected);
    this.dialogRef.close('save');
  }
  resetSelected(calendar:MatCalendar<Date>){    
    this.daysSelected = [];
    calendar.updateTodaysDate();
  }
}
