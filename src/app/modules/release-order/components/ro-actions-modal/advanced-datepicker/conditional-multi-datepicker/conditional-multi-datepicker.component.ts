import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdvancedDatepickerService } from 'src/app/modules/release-order/services/advanced-datepicker.service';
import { customMethods } from 'src/app/shared/methods/shared-methods';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-conditional-multi-datepicker',
  templateUrl: './conditional-multi-datepicker.component.html',
  styleUrls: ['./conditional-multi-datepicker.component.scss']
})
export class ConditionalMultiDatepickerComponent implements OnInit {

  DateRangeFormGroup: FormGroup;
  logicFormGroup: FormGroup;
  isOptionalStep: Boolean = true;
  daysOfWeek:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  types:string[] = ['All','Alternate','First','Second','Third','Fourth'];
  constructor(private _formBuilder: FormBuilder,private selectedDaysService:AdvancedDatepickerService) { }

  ngOnInit(): void {
    this.DateRangeFormGroup = this._formBuilder.group({
      start: ['',Validators.required],
      end: ['',Validators.required]
    });
    this.logicFormGroup = this._formBuilder.group({
      type: ['', Validators.required],
      day: ['', Validators.required]
    });
    // this.logicFormGroup.valueChanges.subscribe(val=>console.log('test',val))
    // this.DateRangeFormGroup.valueChanges.subscribe(selected=>{
      
    //   if(['',null,undefined].every(val=>val == selected?.start) && ['',null,undefined].every(val=>val == selected?.end)){
    //     console.log('dates',selected,this.DateRangeFormGroup);        
    //   }
    // })
  }
  
  DateRangeCompleted(){
    console.log(this.DateRangeFormGroup.value.start,this.DateRangeFormGroup.value.end)
  }
  LogicAdded(){
    console.log(this.logicFormGroup)

  }
  RemoveLogic(){
    //this.logicFormGroup.get('type').setValue(<newValue>);
    this.logicFormGroup.setValue({
      type:'',
      day:''
    })
  }
  saveSelectedDates(){
    this.calculateDate();
    //this.selectedDaysService.setSeletedDates(this.daysSelected);
    //this.dialogRef.close('save');
  }
  calculateDate() {
    //test
    var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
    let startday = dayjs(this.DateRangeFormGroup.value.start);
    let endday = dayjs(this.DateRangeFormGroup.value.end);
    let day = days[this.logicFormGroup.value.day.toLowerCase().substr(0,3)];
    var result = [];
    var current = startday.clone().day(7 + day);
    while (current.isSame(endday) || current.isBefore(endday)) {
      current = current.day(7 + day);
      result.push(current.clone());
    }
    //test-end
    console.log('test',result);
    // if(!customMethods.isEmpty(this.DateRangeFormGroup.value.start) && !customMethods.isEmpty(this.DateRangeFormGroup.value.end)){
    //   let noOfDays = customMethods.calculateDiff(this.DateRangeFormGroup.value.start,this.DateRangeFormGroup.value.end)
    //   let startdate = new Date(this.DateRangeFormGroup.value.start)
    //   for(let i = 0;i<=noOfDays;i++){

    //     let dateToAdd = new Date().setDate(startdate.getDate() + i)

    //   }
    // }

  }
  // onStepChanged(event:any,calendar:any){
  //   console.log(event);
    
  //   if(event.previouslySelectedIndex == 0){
  //     let dateCount = new Date(this.DateRangeFormGroup.value.start);
  //     while(dateCount<=this.DateRangeFormGroup.value.end){
  //       console.log(dateCount);
  //       this.select(dateCount,calendar)
  //       dateCount.setDate(dateCount.getDate() + 1);        
  //     }
  //     console.log()
  //     //calendar.updateTodaysDate();
  //   }
  // }

  
  
  
  ////
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

  select(event: any, calendar?: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    //calendar.updateTodaysDate();
  }
}
