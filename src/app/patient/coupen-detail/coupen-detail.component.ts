
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
  selector: 'app-coupen-detail',
  templateUrl: './coupen-detail.component.html',
  styleUrls: ['./coupen-detail.component.css'],
  providers: [LoginService]

})
export class CoupenDetailComponent implements OnInit {
  coupenId: string = "";
  coupen: any = {};
  SimilarCoupons: any = [];
  oneStarRating: number = 0
  twoStarRating: number = 0
  threeStarRating: number = 0
  fourStarRating: number = 0
  fiveStarRating: number = 0
  reviewCount: number = 0;
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;
  isloggedin: boolean = false;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private _route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loading = true;
  }


  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
    this._route.params.subscribe(data => {
      console.log(data);
      this.coupenId = data.id

      this.getCoupen();
      this.incrementCouponView()

    });


  }

  arrayOne(n: number): any[] {

    n = Math.floor(n)
    if (n && n != undefined)
      return Array(n);
    else
      return []
  }
  getCoupen() {
    this.loginService.getCoupen(this.coupenId).subscribe(res => {
      this.loading = false;
      if (res.IsSuccess) {
        this.coupen = res.Data;
        this.SimilarCoupons = res.SimilarCoupons;
        this.reviewCount = res.Data.Reviews.length

        this.oneStarRating = res.Data.One_Stars_Count / this.reviewCount * 100
        this.twoStarRating = res.Data.Two_Stars_Count / this.reviewCount * 100
        this.threeStarRating = res.Data.Three_Stars_Count / this.reviewCount * 100
        this.fourStarRating = res.Data.Four_Stars_Count / this.reviewCount * 100
        this.fiveStarRating = res.Data.Five_Stars_Count / this.reviewCount * 100

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

  incrementCouponView() {
    this.loginService.incrementCouponView(this.coupenId).subscribe(res => {


    });
  }

  viewCoupen(id) {

    this.router.navigate(["/patient/viewCoupon/" + id]);

  }


  buyCoupen() {
    if (this.cookieService.getItem("_id"))
      this.router.navigate(["/patient/pay-coupen/" + this.coupenId]);
    else {
      this.ts.pop("error", "", "please login first..")

      setTimeout(() => {
        this.router.navigate(["/login"]);

      }, 2500);
    }

  }




  getDiscountPercnt(coupen) {

    var N = (coupen.value - coupen.discountedValue) * 100 / coupen.value
    N = Math.ceil(N);

    return N;
  }

  shareUrl(type) {
    let url = 'http://ischedulenow.com/patient/coupenDetail/' + this.coupenId
    if (type == 'facebook') {
      let sUrl = 'http://www.facebook.com/sharer.php?u=' + url;
      window.open(sUrl, '_blank');
    }
    else if (type == 'twitter') {
      let sUrl = 'https://twitter.com/share?url=' + url + '&text=' + '' + '&via= ' + url + '&hashtags=' + 'coupens';
      window.open(sUrl, '_blank');
    }
    else if (type == 'li') {
      let sUrl = 'http://www.linkedin.com/shareArticle?url=' + url + '&title=' + 'coupens';
      window.open(sUrl, '_blank');
    }
    else if (type == 'in') {
      let sUrl = 'http://www.linkedin.com/shareArticle?url=' + url + '&title=' + 'coupens';
      window.open(sUrl, '_blank');
    }

  }
}

