import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "../landing/services/cookie.service";

@Component({
  selector: "app-doctor-root",
  template: "<router-outlet> </router-outlet>"
})
export class PatientComponent {
  title = "doc-app";
  constructor(private router: Router, private cookieService: CookieService) {
    if (this.cookieService.getItem('Token') == null) {
      // this.router.navigate(["/"]);

    }
  }
}
