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
import { ListOrganismeComponent } from './modules/list-organisme/list-organisme.component';
import { AjouteOrganismeComponent } from './modules/ajoute-organisme/ajoute-organisme.component';
import { AccueilComponent } from './modules/accueil/accueil.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { AuthGuard } from './modules/auth.guard'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './modules/jwt.interceptor';


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
    StatistiqueComponent,
    ListOrganismeComponent,
    AjouteOrganismeComponent,
    AccueilComponent,
    ChangePasswordComponent,
    


    
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
    MatDialogModule,

    
    
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [AjouteOrganismeComponent]
})
export class AppModule { }
