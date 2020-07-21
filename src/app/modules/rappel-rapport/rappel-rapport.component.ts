import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dossier } from 'src/app/entities/dossier';
import { DashboardService } from '../dashboard.service';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-rappel-rapport',
  templateUrl: './rappel-rapport.component.html',
  styleUrls: ['./rappel-rapport.component.scss']
})
export class RappelRapportComponent implements OnInit {
  dossier:Dossier;
  id_cadres=[];
  cadres=[];
  direction_centrale:string;
  sujet:string;
  pays:string;
  ville:string;
  adresse:string;
  date_deb:string;
  date_fin:string;
  constructor(private router:Router,private Myservice:DashboardService) { }

  ngOnInit() {
    this.Myservice.myDossier.subscribe(data => {
      console.log(data),
      this.dossier = data;
      this.id_cadres=this.dossier.cadre_id;
      this.direction_centrale=this.dossier.direction;
      this.sujet=this.dossier.sujet;
      this.pays=this.dossier.pays_destination_libelle;
      this.ville=this.dossier.ville;
      this.date_deb=this.dossier.date_deb;
      this.date_fin=this.dossier.date_fin;
      console.log(this.id_cadres);
    });
    this.getCadres();
    this.adresse=this.ville+'/'+this.pays;
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
    this.router.navigateByUrl('/dashboard/posts');
  }
  precedent(){
    this.router.navigateByUrl('/dashboard/fiche');
  }
  download(){
    const options= {
      name:'rappel_rapport.pdf',
      image: { type: 'jpeg'},
      html2canvas: {},
      jsPDF:{orientation:'landscape'}
    }

    const element:Element = document.getElementById('rap');
    html2pdf()
        .from(element)
        .set(options)
        .save()
  }

}
