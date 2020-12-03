
import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../landing/services/login.service";
import { CookieService } from "../../landing/services/cookie.service";


import { Router, ActivatedRoute } from "@angular/router";
import { Title, Meta } from '@angular/platform-browser';


import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";

declare var $;

@Component({
  selector: 'app-review-coupen',
  templateUrl: './review-coupen.component.html',
  styleUrls: ['./review-coupen.component.css'],
  providers: [LoginService, CookieService]
})
export class ReviewCoupenComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  coupenId: String = "";
  coupen: any = {};
  loading: boolean = false;
  review: String = ""
  check: boolean = false
  isloggedin: boolean = false
  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,

    private fb: FormBuilder,
    private ts: ToasterService,
    private _route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
    if (this.cookieService.getItem('_id') == null) {
      this.router.navigate(["/patient/login"]);

    }
    this._route.params.subscribe(data => {
      console.log(data);
      this.coupenId = data.id

      this.getCoupen();


    });


  }


  getCoupen() {
    this.loginService.getCoupen(this.coupenId).subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.coupen = res.Data;
        setTimeout(() => {
          $('.carousel-item').first().addClass('active')

        }, 1000);
        this.meta.addTag({ name: 'url', content: 'http://ischedulenow.com/viewCoupen/' + this.coupenId });
        this.meta.addTag({ name: 'description', content: 'check this coupen code long description to be inserted here.' });
        this.meta.addTag({ name: 'image', content: this.coupen.images[0] });
        this.meta.addTag({ name: 'title', content: 'check out this coupen code' });
      } else {
        this.ts.pop("error", "", res.Message);

      }
    });
  }


  submitReview() {
    if (this.review == '') {
      this.ts.pop("error", "", "please provide coupen review");
      return false;
    }
    if ($('input[name="rating-input"]:checked').val() == undefined || $('input[name="rating-input"]:checked').val() == "") {
      this.ts.pop("error", "", "please provide ratings");
      return false;
    }

    if (this.check == false) {
      this.ts.pop("error", "", "please accept term and conditions");
      return false;
    }

    let dataTosend = {

      "couponId": this.coupenId.trimRight().trimLeft(),
      "review": this.review,
      "rating": $('input[name="rating-input"]:checked').val()

    }

    this.loginService.rateCoupon(dataTosend).subscribe(res => {
      if (res.IsSuccess)
        this.ts.pop("success", "Success", "thanks for the review")
      this.loading = false;
      this.router.navigate(["/patient/couponDetail/" + this.coupenId]);


    });

  }


}
