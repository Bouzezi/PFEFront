import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { JwtService } from '../jwt.service';
import { User } from 'src/app/entities/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators} from '@angular/forms';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
user:User=new User();
user1:User=new User();
confirmPassword:string;
verif=true;
verif1=true;
  constructor(private Myservice :DashboardService,private jwt_service:JwtService) { }

  ngOnInit() {
    
    this.user.username=localStorage.getItem('username');
    this.user1.username=localStorage.getItem('username');
  }
  changePassword(){
    this.jwt_service.login(this.user.username,this.user.password).subscribe(res=>{
      error => console.log(error);
      console.log(res);
      if(res != null && this.user1.password.length>8){
        this.Myservice.changePassword(this.user1).subscribe(res=>{
          error => console.log(error);
          console.log(res);
          
        });
      }

    });  
   
  }
  veriferPassword(){
    if(this.user1.password != this.confirmPassword){
      this.verif=false;
      this.verif1=true;
    }
    else{
      this.verif=true;
      this.verif1=false;
    }
    
  }

    

}
