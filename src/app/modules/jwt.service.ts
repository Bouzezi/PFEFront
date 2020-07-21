import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient) { }

  login(username:string, password:string) {
    return this.httpClient.post<{token:  string}>('http://localhost:8000/login_check', {username, password})
  }
  logout() {
    localStorage.removeItem('token');
  }
  public isLoggedIn(): boolean {      
    let status = false;      
    if (localStorage.getItem('token') != null) {      
       status = true;      
    }    
    else {      
       status = false;      
       }      
    return status;      
    } 
  public getToken(): string {
    return localStorage.getItem('token');
  }
}
