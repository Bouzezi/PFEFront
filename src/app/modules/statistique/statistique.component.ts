import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import * as XLSX from 'xlsx'; 
import { Stat1 } from 'src/app/entities/stat1';
import { Stat2 } from 'src/app/entities/organismeStat';
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  fileName= 'TableauSuivi.xlsx';
  organisme:string;
  direction:string;
  organismes=[];
  directions=[];
  listeAnnee=[]; 
  liste=[]; 

  stat:Stat1;
  oragnismeStat:Stat2;
  constructor(private router:Router,private Myservice:DashboardService) { }

  ngOnInit() {
    this.organisme="selectionner un organisme";
    this.direction="selectionner une direction";
    this.oragnismeStat=new Stat2();
    this.getAllOrganismesEtrangers();
    this.getAllDirections();
    this.stat1();
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
  stat1(){
    this.liste=[];
    this.Myservice.stat1().subscribe((data:any )=> {
      console.log(data);
      
          for (let key2 in data){
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
  stat2(element:any){
    this.direction="selectionner une direction";
    this.liste=[];
    this.stat.organisme=element.target.value;
    this.Myservice.stat2(this.stat).subscribe((data:any )=> {
      console.log(data);
    
          for (let key1 in data){
            this.stat=new Stat1();
            
              
              this.stat.np=data[key1].np;
              
 
                
                for (let key in data[key1]){
                  if(key!= "np"){
                    this.stat.tab.push(data[key1][key]);
                  }
                  
              }
            
            this.stat.tab.reverse();
            this.liste.push(this.stat); 
          }    
    });
    console.log(this.liste);
  }
  stat3(element:any){
    this.organisme="selectionner un organisme";
    this.liste=[];
    this.stat.direction=element.target.value;
    this.Myservice.stat3(this.stat).subscribe((data:any )=> {
      console.log(data);
    
          for (let key1 in data){
            this.stat=new Stat1();
            
              
              this.stat.np=data[key1].np;
              
 
                
                for (let key in data[key1]){
                  if(key!= "np"){
                    this.stat.tab.push(data[key1][key]);
                  }
                  
              }
            
            this.stat.tab.reverse();
            this.liste.push(this.stat); 
          }    
    });
    console.log(this.liste);
  }

  /* doFilter(filterBy: string):any  [] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.stat.filter((stat: any) =>
    stat.np.toLocaleLowerCase().indexOf(filterBy) !== -1);
  } */
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
