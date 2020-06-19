import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { BehaviorSubject} from 'rxjs';
import { Dossier } from '../entities/dossier';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../entities/note';
import { Fiche } from '../entities/fiche_renseignement';
import { Bordereau } from '../entities/bordereau';
import { cadreINS } from '../entities/cadreINS';
import { Historique } from '../entities/historique';
import { Upload } from '../entities/upload';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private dossier = new BehaviorSubject<Dossier>(new Dossier());
myDossier=this.dossier.asObservable();
id_dossier:any;
id_cadre:any;
typeVisite:string; 
constructor(private http:HttpClient) {};

  setDossier(dossier:Dossier){
    this.dossier.next(dossier);
  }
  createDossier(dossier: Dossier):Observable<object>{
    return this.http.post('http://localhost:8000/dossiervisite/new',dossier);
  }
  editDossier(dossier: Dossier):Observable<object>{
    return this.http.put('http://localhost:8000/dossiervisite/edit/'+dossier.id,dossier);
  }
  getAllPays():Observable<object>{
    return this.http.get('http://localhost:8000/paysdestination');
  }
  getAllVilles(Destination:object):Observable<object>{
    return this.http.post('http://localhost:8000/villedestination/villes',Destination);
  }
  getAllOrganismesEtrangers():Observable<object>{
    return this.http.get('http://localhost:8000/organismeEtranger');
  }
  getAllProgrammes():Observable<object>{
    return this.http.get('http://localhost:8000/programmeCooperation/programmes');
  }
  getAllCadres():Observable<object>{
    return this.http.get('http://localhost:8000/cadreINS/cadres');
  }
  getCadreParDirection(Direction:object):Observable<object>{
    return this.http.post('http://localhost:8000/cadreINS/parDirection',Direction);
  }
  getAllDirections():Observable<object>{
    return this.http.get('http://localhost:8000/directionCentrale');
  }
  getCadre(id:any):Observable<object>{
    return this.http.get('http://localhost:8000/cadreINS/'+id);
  }
  getPays(id:any):Observable<object>{
    return this.http.get('http://localhost:8000/paysdestination/'+id);
  }
  getDossierVisite():Observable<any>{
    return this.http.get('http://localhost:8000/dossiervisite/');
  }
  getDossier(id:any):Observable<any>{
    return this.http.get('http://localhost:8000/dossiervisite/'+id);
  }

  newNote(note: Note):Observable<object>{
    return this.http.post('http://localhost:8000/note/new',note);
  }
  getNote(id: any):Observable<object>{
    return this.http.get('http://localhost:8000/note/getNote/'+id);
  }
  editNote(note: Note):Observable<object>{
    return this.http.put('http://localhost:8000/note/edit/'+ note.id,note);
  }
  deleteNote(id:any):Observable<object>{
    return this.http.delete('http://localhost:8000/note/'+id);
  }

  newFiche(fiche:Fiche):Observable<object>{
    return this.http.post('http://localhost:8000/fiches/new',fiche);
  }
  getFiche(id: any,id_cadre:any):Observable<object>{
    return this.http.get('http://localhost:8000/fiches/getFiche/'+id+'/'+id_cadre);
  }
  editFiche(fiche: Fiche):Observable<object>{
    return this.http.put('http://localhost:8000/fiches/edit/'+ fiche.id,fiche);
  }
  deleteFiche(id_dossier: any,id:any):Observable<object>{
    return this.http.delete('http://localhost:8000/fiches/delete/'+id_dossier+'/'+id);
  }

  getBordereau(id: any):Observable<object>{
    return this.http.get('http://localhost:8000/bordereau/getBordereau/'+id);
  }
  editBordereau(bordereau: Bordereau):Observable<object>{
    return this.http.put('http://localhost:8000/bordereau/edit/'+ bordereau.id,bordereau);
  }
  newBordereau(bordereau: Bordereau):Observable<object>{
    return this.http.post('http://localhost:8000/bordereau/new',bordereau);
  }
  deleteBordereau(id:any):Observable<object>{
    return this.http.delete('http://localhost:8000/bordereau/'+id);
  }

  newcadre(cadre:cadreINS):Observable<object>{
    return this.http.post('http://localhost:8000/cadreINS/new',cadre);
  }
  editcadre(cadre: cadreINS):Observable<object>{
    return this.http.put('http://localhost:8000/cadreINS/edit/'+ cadre.id,cadre);
  }
   getTableauSuivi():Observable<any>{
  return this.http.get('http://localhost:8000/dossiervisite/suivi');
  }
  uploadFiles(up :any):Observable<object>{
    return this.http.post('http://localhost:8000/uploadFiles/upload',up);
  }
  sauvegarde(t :any):Observable<object>{
    return this.http.post('http://localhost:8000/uploadFiles/new',t);
  }
  count(historique :Historique):Observable<object>{
    return this.http.post('http://localhost:8000/participation/count',historique);
  }
  stat1():Observable<object>{
    return this.http.get('http://localhost:8000/participation/cadreParAnnee');
  }
  stat2(org:any):Observable<object>{
    return this.http.post('http://localhost:8000/participation/statParOrganisme',org);
  }
  stat3(dir:any):Observable<object>{
    return this.http.post('http://localhost:8000/participation/statParDirection',dir);
  }

}