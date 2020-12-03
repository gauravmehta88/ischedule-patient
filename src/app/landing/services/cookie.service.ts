import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable()
export class CookieService {
  constructor(private router: Router) { }

  setItem(sKey, sValue) {
    // sDomain = environment.domain;
    localStorage.setItem(sKey, sValue);
    return true;
  }

  getItem(sKey) {
    if (!sKey) {
      return null;
    }
    return localStorage.getItem(sKey);
  }

  removeItem(sKey) {
    // sDomain = environment.domain;
    localStorage.removeItem(sKey);
    return true;
  }

  removeCookies() {
    localStorage.clear();
  }
}
