import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Upload } from 'src/app/entities/upload';
import { cadreINS } from 'src/app/entities/cadreINS';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  data:any;
  file:any;
  up:Upload;
  cadres=[];
  cadreINS:cadreINS;
  cadre_id:any;
  invalidFileMsg="";
  constructor(private Myservice:DashboardService) { }

  ngOnInit() {
    this.cadre_id="selectionner un cadre";
    this.Myservice.getAllCadres().subscribe(data => {
      console.log(data);
      for (let key in data)
      if(data.hasOwnProperty(key))
      this.cadres.push(data[key]);
    });
  }
  upload(event) {
    this.file = event.target.files[0];
      if (!this.validateFile(this.file.name)) {
        this.invalidFileMsg="format selectionner du fichier est invalide";
      }
      else
      {
        this.invalidFileMsg="";
        this.data=new FormData();
        this.data.append('file', this.file);

      }
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'rar' || ext.toLowerCase() == 'zip') {
        return true;
    }
    else {
        return false;
    }
}
  onSubmit(){
    this.Myservice.uploadFiles(this.data).subscribe(data => {
      console.log(data);
    });
  }

  sauvegarde(){
    this.cadreINS=new cadreINS();
    this.cadreINS.id=this.cadre_id;
    this.Myservice.sauvegarde(this.cadreINS).subscribe(data => {
      console.log(data);
    });
  }

}
