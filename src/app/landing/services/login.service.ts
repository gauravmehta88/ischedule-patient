// import { window } from "rxjs/operator/window";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";


import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { environment } from "./../../../environments/environment";

import { CookieService } from "./cookie.service";

@Injectable()
export class LoginService {
  constructor(
    private router: Router,
    private http: Http,
    private cookieService: CookieService
  ) { }

  signUp(signupDetails) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/doctor/create", signupDetails, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  forgotPassword(userName) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(
      environment.baseURL + "api/doctor/forgotPassword",
      { userName: userName },
      {
        headers: headers
      }
      )
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }


  forgotPasswordForPatient(userName) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(
      environment.baseURL + "api/patient/forgotPassword",
      { userName: userName },
      {
        headers: headers
      }
      )
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  getCoupen(cId) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(
      environment.baseURL + "api/coupon/" + cId,

      {
        headers: headers
      }
      )
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  rateCoupon(rating) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(
      environment.baseURL + "api/patient/" + this.cookieService.getItem("_id") + '/rateCoupon',
      rating,
      {
        headers: headers
      }
      )
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  rateDoctor(rating) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(
      environment.baseURL + "api/patient/" + this.cookieService.getItem("_id") + '/rateDoctor',
      rating,
      {
        headers: headers
      }
      )
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  incrementCouponView(cId) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .put(
      environment.baseURL + "api/incrementCouponView/" + cId,

      {
        headers: headers
      }
      )
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }



  getDocument(dId) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(
      environment.baseURL + "api/document/" + dId,

      {
        headers: headers
      }
      )
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  verifyEmail(data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/doctor/verifyEmail", data, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  verifyEmailForPatient(data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/patient/verifyEmail", data, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }


  generateNewPassword(data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/doctor/generateNewPassword", data, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }


  generateNewPasswordForPatient(data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/patient/generateNewPassword", data, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  signUpPatient(signupDetails) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/patient/create", signupDetails, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  loginDoctor(loginDetails) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/doctor/login", loginDetails, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }

  loginPatient(loginDetails) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.baseURL + "api/patient/login", loginDetails, {
        headers: headers
      })
      .pipe(map(res => res.json()))

      .pipe(catchError(e => {
        if (e.status === 401) {
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      }));
  }
}
