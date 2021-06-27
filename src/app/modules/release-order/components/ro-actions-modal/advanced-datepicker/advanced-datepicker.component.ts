import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-advanced-datepicker',
  templateUrl: './advanced-datepicker.component.html',
  styleUrls: ['./advanced-datepicker.component.scss']
})
export class AdvancedDatepickerComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }
  DateRangeFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ngOnInit(): void {
    this.DateRangeFormGroup = this._formBuilder.group({
      start: new FormControl(),
      end: new FormControl()
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
