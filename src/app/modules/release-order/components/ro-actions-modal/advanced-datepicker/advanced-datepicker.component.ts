import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdvancedDatepickerService } from '../../../services/advanced-datepicker.service';

@Component({
  selector: 'app-advanced-datepicker',
  templateUrl: './advanced-datepicker.component.html',
  styleUrls: ['./advanced-datepicker.component.scss']
})
export class AdvancedDatepickerComponent implements OnInit {

  dateRangeSelected:string[];
  constructor(public dialogRef: MatDialogRef<AdvancedDatepickerComponent>,private selectedDatesService:AdvancedDatepickerService) {}

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close('close');
  }
}
