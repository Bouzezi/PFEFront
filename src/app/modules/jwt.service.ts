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
  public get loggedIn(): boolean{
    return localStorage.getItem('token') !==  null;
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
}
