import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
user:User;
  constructor(private route:Router,private Myservice:DashboardService) { 
    this.user=new User();
  }

  ngOnInit() {
  }

  changePassword(){
    this.Myservice.changePassword(this.user).subscribe((data:any) =>{
      console.log(data),
      error => console.log(error)
    });
    this.route.navigateByUrl('sign-in');
  }
}
