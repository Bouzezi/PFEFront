import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { TableauSuivi } from 'src/app/entities/tableauSuivi';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-tableau-suivi',
  templateUrl: './tableau-suivi.component.html',
  styleUrls: ['./tableau-suivi.component.scss']
})
export class TableauSuiviComponent implements OnInit {
  tableau_suivi:Array<TableauSuivi>=[];
  suivi:TableauSuivi;
  _listFilter = '';
    filteredSuivi= [];
  cadres=[];
  tab=[];
  frais="INS";
  fileName= 'TableauSuivi.xlsx'; 
  startindex =0;
  endindex=50;
  nb:any;
  constructor(private router:Router,private Myservice:DashboardService) { 
    this.filteredSuivi = this.tab;
    this.listFilter = '';
  }

  ngOnInit() {
    this.Myservice.getTableauSuivi().subscribe(data => {
      console.log(data);
      this.nb=Math.round(Object.keys(data).length/50)+1;
      for (let key in data){
        if(data.hasOwnProperty(key)){
            this.suivi=new TableauSuivi();
            this.suivi.nom=data[key].nom;
            this.suivi.prenom=data[key].prenom;
            this.suivi.grade=data[key].grade;
            this.suivi.fonction=data[key].fonction;
            this.suivi.direction=data[key].direction;
            this.suivi.nature=data[key].nature;
            this.suivi.nbr_participant_ins=data[key].nbr_participant_ins;
            this.suivi.nbr_participant_sp=data[key].nbr_participant_sp;
            this.suivi.objectif_visite=data[key].objectif_visite;
            this.suivi.organisme_etranger_lib=data[key].organisme_etranger_lib;
            this.suivi.pays_destination_lib=data[key].pays_destination_lib;
            this.suivi.ville=data[key].ville;
            this.suivi.sujet=data[key].sujet;
            this.suivi.type_visite=data[key].type_visite;
            this.suivi.date_arrive_visite=data[key].date_arrive_visite;
            this.suivi.date_deb=data[key].date_deb;
            this.suivi.date_fin=data[key].date_fin;
            this.suivi.date_envoi_documents=data[key].date_envoi_documents;
            this.suivi.date_envoie_rapport=data[key].date_envoie_rapport;
            this.suivi.frais_residence=data[key].frais_residence;
            this.suivi.frais_transport=data[key].frais_transport;
            if(this.suivi.frais_residence == true && this.suivi.frais_transport == true)
              this.frais=this.suivi.organisme_etranger_lib;
            if(this.suivi.frais_residence == true && this.suivi.frais_transport == false || this.suivi.frais_residence == false && this.suivi.frais_transport == true )
              this.frais=this.frais+" / "+this.suivi.organisme_etranger_lib;
            this.tab.push(this.suivi);
          }
      }
      
    });

  }
  updateindex(pageIndex){
    this.startindex= pageIndex * 50;
    this.endindex= this.startindex + 50;
    console.log(this.startindex)
    console.log(this.endindex)
    }
  getarray(length){
    return new Array(length);
  }
  
    get listFilter(): string {
        return this._listFilter;
    }
 
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredSuivi = this.listFilter ? this.doFilter(this.listFilter) : this.tab;
    }
  doFilter(filterBy: string):any  [] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tab.filter((cadreINS: any) =>
      (cadreINS.prenom.toLocaleLowerCase()+cadreINS.nom.toLocaleLowerCase()).indexOf(filterBy) !== -1
    );
  }
  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

}
