import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from './../../../../environments/environment';
import { JwtService } from '../../shared-services/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  public uploader: FileUploader;
  public hasDragOver = false;

  @Input()
  public editmode = false;

  @Input()
  public url = '';

  @Output()
  private urlChange = new EventEmitter();

  constructor(protected jwtService: JwtService) {
    this.uploader = new FileUploader({
      // url: `${environment.api_url}`+'/storage/local/uploadFile',
      url: `${environment.api_url}`+'/user/update/profilpic',
      disableMultipart: false,
      autoUpload: true,
      authToken: 'Bearer ' + this.jwtService.getToken()
    });

    this.uploader.response.subscribe(res => {
      // Upload returns a JSON with the image ID
      console.log(res);
      this.url = JSON.parse(res).profile.image;
      this.urlChange.emit(this.url);
    });
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }

  ngOnInit() {
  }

}
