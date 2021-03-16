import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { ErrorAlertComponent } from 'src/app/shared/modules/alerts/error-alert/error-alert.component';
import { SuccessAlertComponent } from 'src/app/shared/modules/alerts/success-alert/success-alert.component';
import { IPublicationCreation, IuploadedImage } from '../../../interfaces/publicationModels';
import { PublicationsService } from '../../../services/publications.service';

@Component({
  selector: 'app-publication-actions-modal',
  templateUrl: './publication-actions-modal.component.html',
  styleUrls: ['./publication-actions-modal.component.scss']
})
export class PublicationActionsModalComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,private publicationsService:PublicationsService,private dialog:MatDialog,private publicationsActionModalRef:MatDialogRef<PublicationActionsModalComponent>) { }
  modalType:string = "Add";
  form:FormGroup;
  uploadedImage:IuploadedImage;
  ngOnInit(): void {
    this.setupForm()
  }
  setupForm(){
    this.form = this.formBuilder.group({
      name : ['',Validators.required]
    })
  }
  onImageUpload(event:IuploadedImage){
    this.uploadedImage = event;
  }
  onSubmit(formData){
    let apiResult:IApiResponse;
    let postObject = {
      PublicationName:formData.name,
      PublicationLogo:this.uploadedImage.base64
    }
    console.log('final',postObject)
    this.publicationsService.createPublication(postObject).subscribe((res)=>{
      console.log(res)
      apiResult = res
    },err=>{
      console.log(err)
    },
    ()=>{
      if(apiResult.statusCode === 1){
        let dialogRef = this.dialog.open(SuccessAlertComponent,{
          width:'350px',
          height:'120px',
          data:{
            text:apiResult.message
          }
        })
        dialogRef.afterClosed().subscribe(result=>{
          if(result){
            console.log(result);
            this.publicationsActionModalRef.close(result);
          }
        })
      }
      else{
        this.dialog.open(ErrorAlertComponent,{
          width:'350px',
          height:'120px',
          data:{
            text:apiResult.message
          }
        })
      }
    })
    
  }
}
