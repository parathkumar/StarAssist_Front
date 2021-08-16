import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
          state('in', style({ opacity: 100 })),
          transition('* => void', [
                animate(300, style({ opacity: 0 }))
          ])
    ])
]
})
export class ImageUploadComponent implements OnInit {

  @Input() text = 'Drag and drop or click to upload';
      @Input() param = 'file';
      @Input() target = 'assets/images';
      @Input() accept = 'image/*';
      @Input() id;
      @Input() borderPadding = '50';
    @Input() height = '200';
      @Input() width = '200';
      inputImageSrc: any;
      inputImageType: any;
      @Output() complete = new EventEmitter<FileUploadModel>();
      fileUploadModel: FileUploadModel;
      dragging: boolean = false;
      loaded: boolean = false;
      imageLoaded: boolean = false;
      imageSrc: SafeUrl;

      get _inputImageSrc(): any {
            return this.inputImageSrc;
      }
      @Input('inputImageSrc')
      set _inputImageSrc(value: any) {
            this.inputImageSrc = value;
            //this.bindImage();
            console.log('in bindimg')
      }

      get _inputImageType(): any {
            return this.inputImageType;
      }
      @Input('inputImageType')
      set _inputImageType(value: any) {
            this.inputImageType = value;
            //this.bindImage();
      }

      constructor(private sanitizer: DomSanitizer) { }

      ngOnInit() {
            this.bindImage();
      }

      private bindImage() {
            this.fileUploadModel = { type: null, base64: null };
            console.log('type',this.inputImageType)
            if (this.inputImageSrc && this.inputImageType) {
                  this.inputImageSrc = "data:image/" + this.inputImageType + ";base64," + this.inputImageSrc;
                  this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputImageSrc);
                  
            }
      }
      handleDragEnter() {
            this.dragging = true;
      }

      handleDragLeave() {
            this.dragging = false;
      }

      handleDrop(e) {
            e.preventDefault();
            this.dragging = false;
            this.handleInputChange(e);
      }

      handleImageLoad() {
            this.imageLoaded = true;
      }

      onClick(value) {
            const fileUpload = document.getElementById(value) as HTMLInputElement;
            fileUpload.click();
      }

      handleInputChange(e) {
            var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

            var pattern = /image-*/;
            var reader = new FileReader();

            if (!file.type.match(pattern)) {
                  console.log('invalid format');
                  return;
            }
            this.fileUploadModel.type = file.type.split('/')[1];
            this.loaded = false;
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsDataURL(file);
      }

      _handleReaderLoaded(e) {
            var reader = e.target;
            this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result);
            this.fileUploadModel.base64 = reader.result;
            this.fileUploadModel.base64 = this.fileUploadModel.base64.split(',')[1];
            this.complete.emit(this.fileUploadModel);
      }

      cancel() {
            this.imageSrc = "null"
      }

      setBorderStyles() {
            let styles = {
              'border':'1px dashed #cecece',
              'padding': this.borderPadding + 'px 0',
              'text-align':'center'
            };
            return styles;
          }
}

export class FileUploadModel {
  type: string;
  base64: any;
}
