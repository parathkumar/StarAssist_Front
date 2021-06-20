import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageUploadComponent } from 'src/app/shared/components/image-upload/image-upload.component';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { ErrorAlertComponent } from 'src/app/shared/modules/alerts/error-alert/error-alert.component';
import { SuccessAlertComponent } from 'src/app/shared/modules/alerts/success-alert/success-alert.component';
import { IPublication, IPublicationCreation, IuploadedImage } from '../../../interfaces/publicationModels';
import { PublicationsService } from '../../../services/publications.service';

@Component({
  selector: 'app-publication-actions-modal',
  templateUrl: './publication-actions-modal.component.html',
  styleUrls: ['./publication-actions-modal.component.scss']
})
export class PublicationActionsModalComponent implements OnInit {
modalType:string;
data:IPublication=null;
  constructor(private formBuilder : FormBuilder,@Inject(MAT_DIALOG_DATA) data,private publicationsService:PublicationsService,private dialog:MatDialog,private publicationsActionModalRef:MatDialogRef<PublicationActionsModalComponent>) { 
    this.modalType=data.type;
    this.data=data.data;
  }

  form:FormGroup;
  uploadedImage:IuploadedImage;
  ngOnInit(): void {
    this.setupForm()
  }
  setupForm(){
    this.form = this.formBuilder.group({
      name : [this.data.publicationName,Validators.required]
    })
  }
  onImageUpload(event:IuploadedImage){
    this.uploadedImage = event;
  }
  onSubmit(formData){
  if(this.modalType==actionConstants.create)
  {
    this.createPublication(formData);
  }
  else{
    this.editPublication(formData);
  }
    
  }
  createPublication(Publicationobj)
  {
    let apiResult:IApiResponse;
    let postObject = {
      PublicationName:Publicationobj.name,
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
  editPublication(Publicationobj)
  {
    let postObject= {
      PublicationId: this.data.publicationId,
      PublicationName: Publicationobj.name,
      PublicationLogo:(this.uploadedImage?this.uploadedImage.base64:this.data.publicationLogo.toString().split(',')[1])
    }
    this.publicationsService.editPublication(postObject).subscribe((res:IApiResponse)=>{
      if(res.result)
      {
      this.publicationsActionModalRef.close(res);
      }
      else
      {
        let dialogRef=this.dialog.open(ErrorAlertComponent,{
          width:'350px',
          height:'125px',
          data:{
            text: res.message
          }
        })
      }
    })
  }
  getImage(){
    //console.log(this.uploadedImage?this.uploadedImage.base64:this.data.publicationLogo.toString().split(',')[1])
    return this.uploadedImage?this.uploadedImage?.base64:this.data?.publicationLogo?.toString().split(',')[1];
  }
  getImageType(){
    //console.log(this.uploadedImage?this.uploadedImage?.type:this.data?.publicationLogo?.toString().split(',')[0])
    return this.uploadedImage?this.uploadedImage?.type:this.data?.publicationLogo?.toString().split(',')[0];
  }
}
