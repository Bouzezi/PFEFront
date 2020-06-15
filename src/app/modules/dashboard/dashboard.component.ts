import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from  'html2canvas' ;
import * as html2pdf from 'html2pdf.js';
import { Dossier } from 'src/app/entities/dossier';
import { DatePipe, formatDate } from '@angular/common';
import { Pays_destination } from 'src/app/entities/pays_destination';
import { Direction_centrale } from 'src/app/entities/direction_centrale';
import { cadreINS } from 'src/app/entities/cadreINS';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Historique } from 'src/app/entities/historique';
import { isNumber } from 'util';
import { ArrayType } from '@angular/compiler';

export interface PeriodicElement {
 
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
dossier:Dossier= new Dossier();
mission:Dossier;
pays=[];
Allcadres=[];
directions=[];
organismes=[];
programmes=[];
cadre1=[];
cadre2=[];
cadre3=[];
cadre4=[];
cadre5=[];
villes=[];
Destination:Pays_destination;
Direction:Direction_centrale;
cadreINS1=[];
cadreINS2=[];
cadreINS3=[];
cadreINS4=[];
cadreINS5=[];
id="0";
fonction1:string;
fonction2:string;
fonction3:string;
fonction4:string;
fonction5:string;
grade1:string;
grade2:string;
grade3:string;
grade4:string;
grade5:string;
dossier1:Dossier;
frais_residence_ins:boolean;
frais_transport_ins:boolean;
tab=[];
direction1:string;
direction2:string;
direction3:string;
direction4:string;
direction5:string;
cadre_participe=[];
Now:number= new Date().getFullYear();
Year1:number= new Date().getFullYear()-1;
Year2:number= new Date().getFullYear()-2;
annee1=[];
annee2=[];
annee3=[];
annee4=[];
annee5=[];
nbr:any;
  constructor(private router:Router,private Myservice:DashboardService) { }

  ngOnInit() {    
    if(this.Myservice.id_dossier != null){
      this.getAllDirections();
      this.getAllPays();
      this.getAllOrganismesEtrangers();
      this.getAllProgrammes();
      this.getDossier();
      this.dossier.annee=this.Now.toString();
    }
    
    else{
      this.dossier.direction="";
    this.dossier.pays_destination_libelle="";
    this.dossier.statut="";
    this.dossier.date="";
    this.dossier.date_envoi_documents="";
    this.dossier.organisme_etranger_libelle="";
    this.dossier.programme_libelle="";
    this.dossier.ville="";
    this.dossier.annee=this.Now.toString();
    this.dossier.type_visite=this.Myservice.typeVisite;
    console.log(this.dossier.type_visite);
    this.dossier.frais_transport=false;
    this.dossier.frais_residence=false;
    this.fonction1="";
    this.fonction2="";
    this.grade1="";
    this.grade2="";
    this.getAllDirections();
    this.getAllPays();
    this.getAllOrganismesEtrangers();
    this.getAllProgrammes();
    }
    
    
    
  }
  Next(){
    this.router.navigateByUrl('/dashboard/noteM');
  }
  
selected(){
  console.log(this.dossier.pays_destination_libelle);
  this.Destination=new Pays_destination();
  this.Destination.pays_destination_libelle=this.dossier.pays_destination_libelle;
  this.Myservice.getAllVilles(this.Destination).subscribe(data=>{
    console.log(data),
    error => console.log(error);
    if (this.villes.length> 0) {
      this.villes.splice(0,this.villes.length);
    };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this.villes.push(data[key]);
      }
    }
  });
}
getCadreParDirection(event : any){
  this.id=event.target.id;
  let cadres=[];
  this.Direction=new Direction_centrale();
  this.Direction.libelle_direction=event.target.value;
  this.Myservice.getCadreParDirection(this.Direction).subscribe(data=>{
    console.log(data),
    error => console.log(error);
    if (cadres.length> 0) {
      cadres.splice(0,cadres.length);
    };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
          cadres.push(data[key]);
      }
    }

    switch(this.id){
      case "1" : this.cadre1 = cadres;
                 break;
      case "2" : this.cadre2 = cadres;
                 break;
      case "3" : this.cadre3 = cadres;
                 break;
      case "4" : this.cadre4 = cadres;
                 break;
      case "5" : this.cadre5 = cadres;
                 break;           
    } 
  });
}
count(cadreID:any,annee1:any){
  let h=new Historique();
  h.annee=this.Year2.toString();
  h.cadre_id=cadreID;
  this.Myservice.count(h).subscribe((data:any)=>{
    console.log(data);
    error => console.log(error);
    annee1.push(data);
  });
  h.annee=this.Year1.toString();
  h.cadre_id=cadreID;
  this.Myservice.count(h).subscribe((data:any)=>{
    console.log(data);
    error => console.log(error);
    annee1.push(data);
  });
  h.annee=this.Now.toString();
  h.cadre_id=cadreID;
  this.Myservice.count(h).subscribe((data:any)=>{
    console.log(data);
    error => console.log(error);
    annee1.push(data);
  });
}
getCadre(event: any){
  let id = event.target.id;
  let cadreID=event.target.value;
  let cadre = [];
  let cadreins = [];
    switch(id){
      case "1" : cadreins = this.cadre1;
                 break;
      case "2" : cadreins = this.cadre2;
                 break;
      case "3" : cadreins = this.cadre3;
                 break;
      case "4" : cadreins = this.cadre4;
                 break;
      case "5" : cadreins = this.cadre5;
                 break;           
    } 
    for (let i=0;i<cadreins.length;i++) {
      if (cadreins[i].id == event.target.value) {
          cadre.push(cadreins[i].id);
          cadre.push(cadreins[i].fonction);
          cadre.push(cadreins[i].grade);
          switch(id){
            case "1" : this.cadreINS1 = cadre;
                        this.count(cadreID,this.annee1);
                       break;
            case "2" : this.cadreINS2 = cadre;
                        this.count(cadreID,this.annee2);
                       break;
            case "3" : this.cadreINS3 = cadre;
                        this.count(cadreID,this.annee3);
                       break;
            case "4" : this.cadreINS4 = cadre;
                        this.count(cadreID,this.annee4);
                       break;
            case "5" : this.cadreINS5 = cadre;
                      this.count(cadreID,this.annee5);
                       break;           
          } 
         //this.idSelect = cadreins[i].id;
          //console.log(this.cadreINS5[0]);
      }
    } 
  //}
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
  getAllPays(){
    this.Myservice.getAllPays().subscribe(data=>{
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.pays.push(data[key]);
        }
      }
    });
  }
  getAllOrganismesEtrangers(){
    this.Myservice.getAllOrganismesEtrangers().subscribe(data=>{
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.organismes.push(data[key]);
        }
      }
    });
  }
  getAllProgrammes(){
    this.Myservice.getAllProgrammes().subscribe(data=>{
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.programmes.push(data[key]);
        }
      }
    });
  }
  getAllCadres(){
    this.Myservice.getAllCadres().subscribe(data=>{
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.Allcadres.push(data[key]);
        }
      }
    });
  }
  remplirCadre_id(cadreINS :Array<any>,cadreDossier :Array<any>){
    if(cadreINS.length>0)
      cadreDossier.push(cadreINS[0]) ;   
  }
  createVisite(){
    this.dossier.cadre_participe=this.cadre_participe;
    console.log(this.dossier);
    this.remplirCadre_id(this.cadreINS1,this.dossier.cadre_id);
    this.remplirCadre_id(this.cadreINS2,this.dossier.cadre_id);
    this.remplirCadre_id(this.cadreINS3,this.dossier.cadre_id);
    this.remplirCadre_id(this.cadreINS4,this.dossier.cadre_id);
    this.remplirCadre_id(this.cadreINS5,this.dossier.cadre_id);
    console.log(this.dossier.cadre_id); 
    if(this.dossier.id != null){
      this.Myservice.editDossier(this.dossier).subscribe((data:any) =>{
        console.log(data),
        error => console.log(error),
        this.Myservice.setDossier(data);

  
      });
    }
    else{
      this.Myservice.createDossier(this.dossier).subscribe((data:any) =>{
        console.log(data),
        error => console.log(error),
        this.Myservice.setDossier(data);
        console.log(data.id);
      });
    }
    
    //this.registerForm.reset();
  }
  
   suivant(){
   this.createVisite();
    this.router.navigateByUrl('/dashboard/note');
  }
  getDossier(){
    let obj1:cadreINS;
    let obj2:cadreINS;
    let obj3:cadreINS;
    let obj4:cadreINS;
    let obj5:cadreINS;
    this.Myservice.getDossier(this.Myservice.id_dossier).subscribe(data=>{
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.dossier.id=data[key].id;
          this.dossier.statut=data[key].statut;
          this.dossier.sujet=data[key].sujet;
          this.dossier.pays_destination_libelle=data[key].pays_destination_id;
          this.dossier.nature=data[key].nature;
          this.dossier.organisme_etranger_libelle=data[key].organisme_etranger_id;
          this.dossier.nbr_participant_sp=data[key].nb_participant_sp;
          this.dossier.nbr_participant_ins=data[key].nb_participant_ins;
          this.dossier.langues=data[key].langues;
          this.dossier.frais_transport=data[key].frais_transport;
          this.dossier.frais_residence=data[key].frais_residence;
          this.dossier.date_limite_reponce=data[key].date_limite_reponce;
          this.dossier.date_deb=data[key].date_deb;
          this.dossier.date_fin=data[key].date_fin;
          this.dossier.date_arrive_invitation=data[key].date_arrive_visite;
          this.dossier.date=data[key].date;
          this.dossier.date_envoi_documents=data[key].date_envoi_documents;
          console.log(data[key].ville);
          console.log(data[key].programme_libelle);
          console.log(data[key].direction);
          this.dossier.ville=data[key].ville;
          console.log(this.dossier.ville);
          this.selected();
          this.dossier.programme_libelle=data[key].programme_libelle;
          this.dossier.direction=data[key].direction;
           // à verifier 
            obj1=data[key].cadre_participe[0];
            obj2=data[key].cadre_participe[1];
            obj3=data[key].cadre_participe[2];
            obj4=data[key].cadre_participe[3];
            obj5=data[key].cadre_participe[4];
            
            if(obj1 != null){
              // verifier les cadres participants
              this.cadre_participe.push(obj1.id);
              this.direction1=obj1.direction;
              this.cadre1.push(obj1);
            }
            if(obj2 != null){
              this.cadre_participe.push(obj2.id);
              this.direction2=obj2.direction;
              this.cadre2.push(obj2);
            }
            if(obj3 != null){
              this.cadre_participe.push(obj3.id);
              this.direction3=obj3.direction;
              this.cadre3.push(obj3);
            }
            if(obj4 != null){
              this.cadre_participe.push(obj4.id);
              this.direction4=obj4.direction;
              this.cadre4.push(obj4);
            }
            if(obj5 != null){
              this.cadre_participe.push(obj5.id);
              this.direction5=obj5.direction;
              this.cadre5.push(obj5);
            }
            
          
          if(this.dossier.frais_residence == false)
            this.frais_residence_ins=true;
          if(this.dossier.frais_transport== false)
            this.frais_transport_ins=true;  
        }
      }
    });
  }

  captureScreen()  
  {  
    var data = document.getElementById('dossier');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 212;   
      var pageHeight = 295;    
      var imgHeight = (canvas.height * imgWidth / canvas.width)+40;  
      var heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;  
      pdf.addImage(contentDataURL, 'PNG', -1, position, imgWidth, imgHeight)  
      pdf.save('DossierVisite.pdf'); // Generated PDF   
    });  
  }  

  download(){
    const options= {
      name:'dossierVisite.pdf',
      image: { type: 'jpeg'},
      html2canvas: {},
      jsPDF:{orientation:'landscape'}
    }

    const element:Element = document.getElementById('dossier');
    html2pdf()
        .from(element)
        .set(options)
        .save()
  }

}
