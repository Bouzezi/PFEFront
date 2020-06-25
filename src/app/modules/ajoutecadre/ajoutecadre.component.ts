import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { cadreINS } from 'src/app/entities/cadreINS';

@Component({
  selector: 'app-ajoutecadre',
  templateUrl: './ajoutecadre.component.html',
  styleUrls: ['./ajoutecadre.component.scss']
})
export class AjoutecadreComponent implements OnInit {
  directions=[];
  cadre:cadreINS;
  titre:string;
  constructor(private router:Router,private Myservice:DashboardService) { }
 

  ngOnInit() {
    this.titre=this.Myservice.titreComponent1;
    if(this.Myservice.id_cadre != null){
      this.getcadre();
    }
    this.cadre=new cadreINS();
    this.getAllDirections();
  }

getcadre(){
  this.Myservice.getCadre(this.Myservice.id_cadre).subscribe(data => {
    console.log(data);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this.cadre.nom=data[key].nom;
        this.cadre.prenom=data[key].prenom;
        this.cadre.grade=data[key].grade;
        this.cadre.fonction=data[key].fonction;
        this.cadre.direction=data[key].direction;
      }
    }
  });
}

  getAllDirections(){
    this.Myservice.getAllDirections().subscribe(data=>{
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.directions.push(data[key]);
        }
      }
    });
  }

  ajoute(){
    console.log(this.cadre);
    this.Myservice.newcadre(this.cadre).subscribe(data => {
      confirm("seucces") ,console.log(data),
      error => confirm("ajoute cadre echec");
    });
  }


    update(){
      this.cadre.id=this.Myservice.id_cadre;
      console.log(this.cadre);
      this.Myservice.editcadre(this.cadre).subscribe(data =>{
        console.log(data),
        error => console.log(error) 
      }); 
    }
}



