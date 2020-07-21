import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { Dossier } from 'src/app/entities/dossier';
import { DashboardService } from '../dashboard.service';
import * as moment from 'moment';
import { Fiche } from 'src/app/entities/fiche_renseignement';

@Component({
  selector: 'app-fiche-renseignement',
  templateUrl: './fiche-renseignement.component.html',
  styleUrls: ['./fiche-renseignement.component.scss']
})
export class FicheRenseignementComponent implements OnInit {
  dossier:Dossier;
  id_cadres=[];
  id_participant:any;
  gradeFonction:string="";
  cadres=[];
  date_deb:any;
  date_fin:any;
  diffInDays:any;
  frais_trans_no:boolean;
  frais_trans_yes:boolean;
  frais_res_no:boolean;
  frais_res_yes:boolean;
  fiche:Fiche=new Fiche();
  valid:boolean=false;
  id:any;
    constructor(private router:Router,private Myservice:DashboardService) { }

    ngOnInit() {
      this.Myservice.myDossier.subscribe(data => {
        console.log(data),
        this.dossier = data;
        this.id_cadres=this.dossier.cadre_id;
        this.fiche.dossier_id=this.dossier.id;
        console.log(this.id_cadres);
      });
      this.getCadres();
      this.duree();
      this.frais();
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
    grade_fonction(){
      let i=0;
      while (this.cadres[i].id != this.id_participant && i<this.cadres.length){
        i++;
      }
      this.gradeFonction=this.cadres[i].fonction+"/"+this.cadres[i].grade;
      console.log(this.gradeFonction);
      this.fiche.date="";
      this.fiche.autre_frais="";
      this.fiche.date_envoie_rapport="";
      this.fiche.derniere_visite="";
      this.fiche.objectif_visite="";
      this.fiche.relation_participant_visite="";
      this.getFiche();

    }
    duree(){
      this.date_deb = moment(this.dossier.date_deb);
      this.date_fin = moment(this.dossier.date_fin);
      this.diffInDays = Math.abs(this.date_deb.diff(this.date_fin, 'days')); 
    }
    frais(){
      if(this.dossier.frais_transport == true)
          this.frais_trans_yes=true;
      else
          this.frais_trans_no=true;

      if(this.dossier.frais_residence)
        this.frais_res_yes=true;
      else
      this.frais_res_no=true;
    }

    getFiche(){
      this.Myservice.getFiche(this.fiche.dossier_id,this.id_participant).subscribe((data:any) => {
        console.log(data),
        error => console.log(error);
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            this.fiche.id=data[key].id;
            console.log(this.fiche.id);
            this.id=data[key].id;
            this.fiche.date=data[key].date;
            this.fiche.autre_frais=data[key].autre_frais;
            this.fiche.objectif_visite=data[key].objectif_visite;
            this.fiche.relation_participant_visite=data[key].relation_participant_visite;
            this.fiche.derniere_visite=data[key].derniere_visite;
            this.fiche.date_envoie_rapport=data[key].date_envoie_rapport;
            this.fiche.cadre_ins=this.id_participant;
          }
        }
      });
    }
    newFiche(){
      this.fiche.cadre_ins=this.id_participant;
      console.log(this.fiche);
      this.Myservice.newFiche(this.fiche).subscribe((data:any) => {
        console.log(data),
        error => console.log(error);
        this.getFiche();
      });
      
    }
    editFiche(){
      console.log(this.fiche);
      this.Myservice.editFiche(this.fiche).subscribe(data => {
        console.log(data),
        error => console.log(error);
        this.getFiche();
      });
    }
    deleteFiche(){
      this.Myservice.deleteFiche(this.fiche.dossier_id,this.fiche.id).subscribe((data:any) => {
        console.log(data),
        error => console.log(error);
      });
      this.fiche.date="";
      this.fiche.autre_frais="";
      this.fiche.date_envoie_rapport="";
      this.fiche.derniere_visite="";
      this.fiche.objectif_visite="";
      this.fiche.relation_participant_visite="";
    }
    
    suivant(){
      this.router.navigateByUrl('/dashboard/rappel-rapport');
    }
    precedent(){
      this.router.navigateByUrl('/dashboard/note');
    }

    download(){
      const options= {
        name:'ficheRenseignement.pdf',
        image: { type: 'jpeg'},
        html2canvas: {},
        jsPDF:{orientation:'landscape'}
      }
  
      const element:Element = document.getElementById('fiche');
      html2pdf()
          .from(element)
          .set(options)
          .save()
    }

    change1(){
      if(this.frais_trans_no){
        this.frais_trans_yes = false;
        this.frais_trans_no = false;
        }
    else{
        this.frais_trans_yes = false;
        this.frais_trans_no = true;
    }
   
      }
      change2(){
        if(this.frais_trans_yes){
            this.frais_trans_yes = false;
            this.frais_trans_no = false;
        }
        else{
            this.frais_trans_yes = true;
            this.frais_trans_no = false;
        }
      }
      
      change3(){
        if(this.frais_res_no){
          this.frais_res_yes = false;
          this.frais_res_no = false;
          }
      else{
          this.frais_res_yes = false;
          this.frais_res_no = true;
      }
     
        }
        change4(){
          if(this.frais_res_yes){
              this.frais_res_yes = false;
              this.frais_res_no = false;
          }
          else{
              this.frais_res_yes = true;
              this.frais_res_no = false;
          }
        }


}
 
