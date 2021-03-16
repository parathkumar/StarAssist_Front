import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {

  errorText: string;
  constructor(@Inject(MAT_DIALOG_DATA) data,public dialogRef: MatDialogRef<ErrorAlertComponent>) { 
    dialogRef.disableClose = true;
    if(data.text){
      this.errorText = data.text
    }
    else{
      this.errorText = "Error Occurred.Try again later"
    }
  }

  ngOnInit(): void {
  }

  closeDialog(selection:boolean){
    this.dialogRef.close();
  }
}
