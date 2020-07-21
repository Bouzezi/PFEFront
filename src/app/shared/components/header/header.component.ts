import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/modules/jwt.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();


  constructor(private jwt_service:JwtService,private router:Router) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout(){
    this.jwt_service.logout();
    this.router.navigate(['/sign-in']);
  }
  changePassword(){
    this.router.navigateByUrl('/dashboard/change-password');
  }
}
