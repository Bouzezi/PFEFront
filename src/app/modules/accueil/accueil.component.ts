import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  nbrDossier:string;
  nbrDossierMission:string;
  nbrDossierFormation:string;
  nbrCadre:string;
  constructor(private route:Router,private Myservice:DashboardService) { }

  ngOnInit() {
    this.Myservice.dashbord().subscribe(data => {
      console.log(data);
          this.nbrCadre=data["nbrCadre"];
          this.nbrDossierMission=data["nbrDossierMission"];
          this.nbrDossierFormation=data["nbrDossierFormation"];
          this.nbrDossier=data["nbrDossier"];
          this.chart();
    });
    
  }
  chart(){
     var myChart = new Chart("doughnut-chart", {
      type: 'doughnut',
    data: {
      labels: ["Dossier de visite Mission", "Dossier de visite Formation"],
      datasets: [
        {
          label: "Dossier de Visite",
          backgroundColor: ["#4169E1","#DC143C"],
          data: [parseInt(this.nbrDossierMission),parseInt(this.nbrDossierFormation)]
        }
      ]
    },
    options: {
      legend: { 
        display: true,
        labels: {
          fontColor: 'black'
      }},
      title: {      
        display: true,
        text: 'Nombre de Dossier de Visite'
      }
    }
  });
  }
  

}
