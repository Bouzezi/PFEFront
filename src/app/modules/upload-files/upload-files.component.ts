import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Upload } from 'src/app/entities/upload';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  data:any;
  file:any;
  tabCadres=['1','2'];
  up:Upload;
  c:Object=new Object({tableauCadre:this.tabCadres});
  constructor(private Myservice:DashboardService) { }

  ngOnInit() {
  }
  upload(event) {
    this.file = event.target.files[0];
    this.data=new FormData();
    this.data.append('file', this.file);
  }
  onSubmit(){
    this.Myservice.uploadFiles(this.data).subscribe(data => {
      console.log(data);
    });
  }

  sauvegarde(){
    this.Myservice.sauvegarde(this.c).subscribe(data => {
      console.log(data);
    });
  }

}
