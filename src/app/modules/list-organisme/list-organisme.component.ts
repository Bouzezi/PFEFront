import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import {MatDialog} from  '@angular/material/dialog' ;
import { AjouteOrganismeComponent } from '../ajoute-organisme/ajoute-organisme.component';

@Component({
  selector: 'app-list-organisme',
  templateUrl: './list-organisme.component.html',
  styleUrls: ['./list-organisme.component.scss']
})
export class ListOrganismeComponent implements OnInit {
  organismes=[];
  _listFilter = '';
  startindex =0;
  endindex=10;
  filteredOrganismes= [];
  nb:any;
  constructor(private router:Router,private Myservice:DashboardService, public dialog:MatDialog) {
    this.filteredOrganismes = this.organismes;
    this.listFilter = '';
   }

  ngOnInit() {
    this.getAllOrganismesEtrangers();
  }

  openDialog () {
    const dialogRef = this.dialog.open(AjouteOrganismeComponent);
    this.Myservice.titreComponent="Ajouter un Organisme";
    dialogRef.afterClosed (). subscribe ( result => {
       console .log ( `Dialog result: $ {result} ` );
       window.location.reload();
    });

  }

  updateindex(pageIndex){
    this.startindex= pageIndex * 10;
    this.endindex= this.startindex + 10;
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
      this.filteredOrganismes = this.listFilter ? this.doFilter(this.listFilter) : this.organismes;
      
  }

  doFilter(filterBy: string):any  [] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.organismes.filter((oragnisme: any) =>
    oragnisme.libelle_org.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  getAllOrganismesEtrangers(){
    this.Myservice.getAllOrganismesEtrangers().subscribe(data=>{
      console.log(data),
      this.nb=Math.round(Object.keys(data).length/10)+1;
      error => console.log(error);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.organismes.push(data[key]);
        }
      }   
    });
  }
  edit(element: any){
    console.log(element.target.value);
    this.Myservice.titreComponent="Modifier un Organisme";
    this.Myservice.id_organisme=element.target.value;
  }
}
