
import { Component, OnInit } from '@angular/core';
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { CookieService } from "../../landing/services/cookie.service";

@Component({
  selector: 'app-termandconditions',
  templateUrl: './termandconditions.component.html',
  styleUrls: ['./termandconditions.component.css']
})
export class TermandconditionsComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  isloggedin: boolean = false;
  constructor(private cookieService: CookieService) { }


  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }

  }



}