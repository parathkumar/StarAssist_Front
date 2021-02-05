import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publication-actions-modal',
  templateUrl: './publication-actions-modal.component.html',
  styleUrls: ['./publication-actions-modal.component.scss']
})
export class PublicationActionsModalComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }
  modalType:string = "Add";
  form:FormGroup;
  ngOnInit(): void {
    this.setupForm()
  }
  setupForm(){
    this.form = this.formBuilder.group({
      Name : ['',Validators.required]
    })
  }
  onImageUpload(event){
    console.log('img',event)
  }
  onSubmit(value){
    console.log('form',value)
  }
}
