import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { LoginComponent } from './shared/components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotemissionComponent } from './modules/notemission/notemission.component';
import { HttpClientModule } from '@angular/common/http';
import { RappelRapportComponent } from './modules/rappel-rapport/rappel-rapport.component';
import { BorderouComponent } from './modules/borderou/borderou.component';
import { ListeDossiersComponent } from './modules/liste-dossiers/liste-dossiers.component';
import { MatFormFieldModule, MatIconModule,MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { ListeCadreComponent } from './modules/liste-cadre/liste-cadre.component';
import { AjoutecadreComponent } from './modules/ajoutecadre/ajoutecadre.component';
import { TableauSuiviComponent } from './modules/tableau-suivi/tableau-suivi.component';
import { ChoseDossierComponent } from './modules/choisir-dossier/choisir-dossier.component';
import { UploadFilesComponent } from './modules/upload-files/upload-files.component';
import { StatistiqueComponent } from './modules/statistique/statistique.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotemissionComponent,
    RappelRapportComponent,
    BorderouComponent,
    ListeDossiersComponent,
    ListeCadreComponent,
    AjoutecadreComponent,
    TableauSuiviComponent,
    ChoseDossierComponent,
    UploadFilesComponent,
    StatistiqueComponent


    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
