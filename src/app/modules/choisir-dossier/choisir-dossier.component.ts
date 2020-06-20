import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-choisir-dossier',
  templateUrl: './choisir-dossier.component.html',
  styleUrls: ['./choisir-dossier.component.scss']
})
export class ChoseDossierComponent implements OnInit {

  constructor(private router:Router,private Myservice:DashboardService) { }

  ngOnInit() {
  }
  typeMission(){
    this.Myservice.typeVisite="mission";
    this.Myservice.id_dossier = null;
  }
  typeFormation(){
    this.Myservice.typeVisite="formation";
    this.Myservice.id_dossier = null;
  }

  



}
