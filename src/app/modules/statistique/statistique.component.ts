import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import * as XLSX from 'xlsx'; 
import { Stat1 } from 'src/app/entities/stat1';
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  fileName= 'TableauSuivi.xlsx';
  listeAnnee=[]; 
  liste=[]; 
  listeNombre=[];
  ligne=[];
  stat:Stat1;
  constructor(private router:Router,private Myservice:DashboardService) { }

  ngOnInit() {
    this.stat1();
  }
  stat1(){
    this.Myservice.stat1().subscribe((data:any )=> {
      console.log(data);
      
          for (let key2 in data){
            //if(data.hasOwnProperty(key2))
            //console.log(data.annee[key2]);
            if(key2 == "annee")
              this.listeAnnee=data[key2];

          }
          for (let key1 in data){
            this.stat=new Stat1();
            if(key1 != "annee"){
              
              this.stat.np=data[key1].np;
              
 
                
                for (let key in data[key1]){
                  if(key!= "np"){
                    this.stat.tab.push(data[key1][key]);
                  }
                  
              }
            }
            this.stat.tab.reverse();
            this.liste.push(this.stat); 
          } 
          
      
         
    });
    console.log(this.liste);
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
