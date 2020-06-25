import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Organisme } from 'src/app/entities/organisme';

@Component({
  selector: 'app-ajoute-organisme',
  templateUrl: './ajoute-organisme.component.html',
  styleUrls: ['./ajoute-organisme.component.scss']
})
export class AjouteOrganismeComponent implements OnInit {
  Org:string;
 organisme:Organisme;
  constructor(private Myservice:DashboardService) { }

  ngOnInit() {
    this.organisme=new Organisme();
    this.Org=this.Myservice.titreComponent;
    if(this.Myservice.id_organisme != null){
      this.getOrganisme();
    }
  }
  getOrganisme(){
    this.Myservice.getOrganisme(this.Myservice.id_organisme).subscribe(data => {
      console.log(data);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.organisme.libelle=data[key].libelle_org;
        }
      }
    });
  }
  ajoute(){
    console.log(this.organisme);
    this.Myservice.newOrganisme(this.organisme).subscribe(data => {
    console.log(data)
    });
  }


    update(){
      this.organisme.id=this.Myservice.id_organisme;
      console.log(this.organisme);
      this.Myservice.editOrganisme(this.organisme).subscribe(data =>{
        console.log(data),
        error => console.log(error) 
      }); 
    }

}
