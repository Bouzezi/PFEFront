import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NotemissionComponent } from './modules/notemission/notemission.component';
import { FicheRenseignementComponent } from './modules/fiche-renseignement/fiche-renseignement.component';
import { DefaultModule } from './layouts/default/default.module';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { SignInComponent } from './shared/components/sign-in/sign-in.component';
import { RappelRapportComponent } from './modules/rappel-rapport/rappel-rapport.component';
import { BorderouComponent } from './modules/borderou/borderou.component';
import { ListeDossiersComponent } from './modules/liste-dossiers/liste-dossiers.component';
import { ListeCadreComponent } from './modules/liste-cadre/liste-cadre.component';
import { AjoutecadreComponent } from './modules/ajoutecadre/ajoutecadre.component';
import { TableauSuiviComponent } from './modules/tableau-suivi/tableau-suivi.component';
import { ChoseDossierComponent } from './modules/choisir-dossier/choisir-dossier.component';
import { UploadFilesComponent } from './modules/upload-files/upload-files.component';
import { StatistiqueComponent } from './modules/statistique/statistique.component';
import { ListOrganismeComponent } from './modules/list-organisme/list-organisme.component';
import { AccueilComponent } from './modules/accueil/accueil.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { AuthGuard } from './modules/auth.guard';


const routes: Routes = [{
  
    path: 'dashboard',
  component: DefaultComponent,
  children: [
    {path: 'dossiervisite',component: DashboardComponent, canActivate : [AuthGuard] },
    {path: 'note',component: NotemissionComponent, canActivate : [AuthGuard] },
    {path: 'fiche',component: FicheRenseignementComponent, canActivate : [AuthGuard] },
    {path: 'posts',component: PostsComponent, canActivate : [AuthGuard] },
    {path: 'borderau',component:BorderouComponent, canActivate : [AuthGuard] },
    {path: 'rappel-rapport',component:RappelRapportComponent, canActivate : [AuthGuard] },
    {path: 'liste-dossierVisite',component:ListeDossiersComponent, canActivate : [AuthGuard] },
    {path: 'liste-cadre',component:ListeCadreComponent, canActivate : [AuthGuard] },
    {path: 'ajoutecadre',component:AjoutecadreComponent, canActivate : [AuthGuard] },
    {path: 'table-suivi',component:TableauSuiviComponent, canActivate : [AuthGuard] },
    {path: 'choisir-dossier',component:ChoseDossierComponent, canActivate : [AuthGuard] },
    {path: 'uploadFiles',component:UploadFilesComponent, canActivate : [AuthGuard] },
    {path: 'statistique',component:StatistiqueComponent, canActivate : [AuthGuard] },
    {path: 'list-organisme',component:ListOrganismeComponent, canActivate : [AuthGuard] },
    {path: 'change-password',component:ChangePasswordComponent, canActivate : [AuthGuard] },
    {path: 'accueil',component:AccueilComponent, canActivate : [AuthGuard] }
  ]
},

{ path: 'sign-in', component: SignInComponent},
{ path: '', component: SignInComponent},
{ path: 'sign-up', component:SignUpComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
