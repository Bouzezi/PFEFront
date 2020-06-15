import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dossier } from 'src/app/entities/dossier';
import { DashboardService } from '../dashboard.service';
import { Note } from 'src/app/entities/note';

@Component({
  selector: 'app-notemission',
  templateUrl: './notemission.component.html',
  styleUrls: ['./notemission.component.scss']
})
export class NotemissionComponent implements OnInit {
note:Note=new Note();
sujet:string;
dossier:Dossier=new Dossier();
titre:any="";
  constructor(private route:Router,private Myservice:DashboardService) { }

  ngOnInit() {
    this.Myservice.myDossier.subscribe(data => {
      console.log(data),
      this.dossier = data;
      console.log(this.dossier.id);
      error => console.log(error);
      this.sujet=this.dossier.sujet;
      if(this.Myservice.typeVisite == "mission")
      this.titre= " إلى السيد وزير التنمية والإستثمار والتعاون الدولي";
      else
      this.titre= "الإدارة المركزية";
      this.note.dossier_id=this.dossier.id; 
      console.log(this.note.dossier_id);  
      this.getNote(this.note.dossier_id);  
    });
    
   
  }

  suivant(){
    this.route.navigateByUrl('/dashboard/fiche');
  }

   getNote(id :any){
    this.Myservice.getNote(id).subscribe((data:any) => {
      console.log(data),
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.note.id=data[key].id;
          this.note.date=data[key].date;
          this.note.description=data[key].description;
          this.note.piece_jointe=data[key].piece_jointe;
          this.note.dossier_id=data[key].dossier_id;
        }
      }
    });
  }
  
  
 editNote(){
  this.Myservice.editNote(this.note).subscribe(data => {
    console.log(data),
    error => console.log(error);
    this.getNote(this.note.dossier_id);
  });
} 

newNote(){
  console.log(this.note);
  this.Myservice.newNote(this.note).subscribe(data => {
    console.log(data),
    error => console.log(error);
    this.getNote(this.note.dossier_id);
  });
}

deleteNote(){
  console.log(this.note);
  this.Myservice.deleteNote(this.note.id).subscribe(data => {
    console.log(data),
    error => console.log(error);
          this.note.date="";
          this.note.description="";
          this.note.piece_jointe="";
  });
}
 
}
