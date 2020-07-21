import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      
import { Observable } from 'rxjs';  
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
@Injectable({      
    providedIn: 'root'      
 }) 
export class AuthGuard implements CanActivate {      
    constructor(private router: Router,private jwtService: JwtService) { }      
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
       if (this.jwtService.isLoggedIn()) {      
       return true;      
       }      
       // navigate to login page as user is not authenticated      
    this.router.navigate(['/sign-in']);      
    return false;      
    }      
   
 }    