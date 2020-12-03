import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { environment } from "./../../../environments/environment";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { map } from 'rxjs/operators';

import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Login2Service {

  constructor(
    private router: Router,
    private http: Http,

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
}
