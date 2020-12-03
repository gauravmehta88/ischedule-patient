import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CookieService } from "../../landing/services/cookie.service";
declare var swal: any;

declare var $;
@Component({
  selector: 'app-headerafterlogin',
  templateUrl: './headerafterlogin.component.html',
  styleUrls: ['./headerafterlogin.component.css'],
  providers: [CookieService]
})
export class HeaderafterloginComponent implements OnInit {
  firstName: string = ""
  lastName: string = ""
  profilePicPath: any = null;
  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.firstName = this.cookieService.getItem('firstName')
    this.lastName = this.cookieService.getItem('lastName')
    this.profilePicPath = this.cookieService.getItem('profilePicPath')

    setTimeout(() => {
      this.cookieService.removeCookies();
      this.router.navigate(["/patient/login"]);
    }, 3000000);

  }

  logout() {
    swal({
      title: "LOGOUT",
      text: "Are you sure wanto logout?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Logout!"
    }).then(result => {
      console.log(result);
      if (result) {
        this.cookieService.removeCookies();
        this.router.navigate(["/patient/login"]);
      }
    });
  }

}
