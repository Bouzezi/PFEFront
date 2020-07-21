import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Dossier } from 'src/app/entities/dossier';
import { Bordereau } from 'src/app/entities/bordereau';
import * as html2pdf from 'html2pdf.js';
import * as jspdf from 'jspdf';
import html2canvas from  'html2canvas' ;

@Component({
  selector: 'app-borderou',
  templateUrl: './borderou.component.html',
  styleUrls: ['./borderou.component.scss']
})
export class BorderouComponent implements OnInit {
  dossier:Dossier;
  id_cadres=[];
  cadres=[];
  bordereau:Bordereau=new Bordereau();
  sujet:string;
  date_deb:string;
  date_fin:string;
  constructor(private route:Router,private Myservice:DashboardService) { }

  ngOnInit() {
    this.Myservice.myDossier.subscribe(data => {
      console.log(data),
      this.dossier = data;
      this.id_cadres=this.dossier.cadre_id;
      this.bordereau.dossier_id=this.dossier.id;
      this.sujet=this.dossier.sujet;
      this.date_deb=this.dossier.date_deb;
      this.date_fin=this.dossier.date_fin;
      console.log(this.id_cadres);
    });
    this.getCadres();
    this.getBordereau(this.bordereau.dossier_id);
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
  getBordereau(id :any){
    this.Myservice.getBordereau(id).subscribe((data:any) => {
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.bordereau.id=data[key].id;
          this.bordereau.numero_de_rang=data[key].numero_de_rang;
          this.bordereau.nbr_documents=data[key].nbr_documents;
          this.bordereau.date_bordereau=data[key].date_bordereau;
          this.bordereau.commentaires=data[key].commentaires;
          this.bordereau.date_documents=data[key].date_documents;
          this.bordereau.dossier_id=data[key].dossier_id;
        }
      }
    });
  }
  editBordereau(){
    console.log(this.bordereau);
    this.Myservice.editBordereau(this.bordereau).subscribe(data => {
      console.log(data),
      error => console.log(error);
      this.getBordereau(this.bordereau.dossier_id);
    });
    
  }
  newBordereau(){
    console.log(this.bordereau);
    this.Myservice.newBordereau(this.bordereau).subscribe(data => {
      console.log(data),
      error => console.log(error);
      this.getBordereau(this.bordereau.dossier_id);
    });
    
  } 
  deleteBordereau(){
    console.log(this.bordereau);
    this.Myservice.deleteBordereau(this.bordereau.id).subscribe((data:any) => {
      console.log(data),
      error => console.log(error);
          this.bordereau.numero_de_rang=0;
          this.bordereau.nbr_documents=0;
          this.bordereau.date_bordereau="";
          this.bordereau.commentaires="";
          this.bordereau.date_documents="";
    });
  }
  terminer(){
    this.route.navigateByUrl('/dashboard/liste-dossierVisite');
  }
  precedent(){
    this.route.navigateByUrl('/dashboard/posts');
  }
  download(){
    const options= {
      name:'bordereau.pdf',
      image: { type: 'jpeg'},
      html2canvas: {},
      jsPDF:{orientation:'landscape'}
    }

    const element:Element = document.getElementById('bordereau');
    html2pdf()
        .from(element)
        .set(options)
        .save()
  }
   /*  var data = document.getElementById('bordereau');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });   
  } */
}
