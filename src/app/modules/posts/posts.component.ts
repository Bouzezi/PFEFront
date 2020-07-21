import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Dossier } from 'src/app/entities/dossier';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  dossier:Dossier;
  id_cadres=[];
  cadres=[];
  sujet:string;
  date_deb:string;
  date_fin:string;
  typeV1=false;
  typeV2=false;
  constructor(private route:Router,private Myservice:DashboardService) { }

  ngOnInit() {
    this.Myservice.myDossier.subscribe(data => {
      console.log(data),
      this.dossier = data;
      this.id_cadres=this.dossier.cadre_id;
      this.sujet=this.dossier.sujet;
      this.date_deb=this.dossier.date_deb;
      this.date_fin=this.dossier.date_fin;
      if(this.dossier.type_visite == "formation")
      {
        this.typeV1=true;
        this.typeV2=false;
      }
      else
      {
        this.typeV1=false;
        this.typeV2=true;
      }
      console.log(this.id_cadres);
    });
    this.getCadres();
  }
  getCadres(){
    for(let i=0;i<this.id_cadres.length;i++){
        this.Myservice.getCadre(this.id_cadres[i]).subscribe((data:any) =>{
          console.log(data),
          error => console.log(error),
          this.cadres.push(data[0]);
          console.log(this.cadres);
        });
    }
    console.log(this.cadres);
  }
  suivant(){
    this.route.navigateByUrl('/dashboard/borderau');
  }
  terminer(){
    this.route.navigateByUrl('/dashboard/liste-dossierVisite');
  }
  precedent(){
    this.route.navigateByUrl('/dashboard/rappel-rapport');
  }
  download(){
    const options= {
      name:'post.pdf',
      image: { type: 'jpeg'},
      html2canvas: {},
      jsPDF:{orientation:'landscape'}
    }

    const element:Element = document.getElementById('post');
    html2pdf()
        .from(element)
        .set(options)
        .save()
  }
}
