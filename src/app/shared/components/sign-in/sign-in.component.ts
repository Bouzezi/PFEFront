import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/modules/jwt.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
username:string;
password:string;
checkbox:boolean;
  constructor(private router:Router,private jwt_service:JwtService) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
    if(this.username != null)
    this.checkbox=true;
  }

  login(){
    console.log(this.password);
    this.jwt_service.login(this.username,this.password).subscribe(res=>{
      error => console.log(error);
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/dashboard/choisir-dossier');
      });
    
  }
  remember(){
    console.log(this.checkbox);
    if(this.checkbox && this.username != null){
      localStorage.setItem('username',this.username);
    }
    else
    localStorage.removeItem('username');
  }

  
}
