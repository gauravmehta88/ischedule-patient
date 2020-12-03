
import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";
import { CookieService } from "../../landing/services/cookie.service";

import { Router, ActivatedRoute } from "@angular/router";


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
import * as filestack from 'filestack-js';

const client = filestack.init('AGqWW8kQNRqi122GGl1nvz');


declare var $;
@Component({
  selector: 'app-coupen',
  templateUrl: './coupen.component.html',
  styleUrls: ['./coupen.component.css'],
  providers: [DoctorService, CookieService]
})


export class CoupenComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  Cattitle: string = "";
  discountedValue: string = "";
  address: string = "";
  valid_from: string = "";
  valid_till: string = "";
  keyword: string = "";
  minDate: Date = new Date()
  pageNo: number = 1;
  noData: boolean = false
  limit: number = 15;
  pageCount: number = 1;

  title: string = "";
  price: string = "";
  description = "";
  allCoupens: any = [];
  coupenDocs: any = [];
  couponCategory: string = "";
  isEdit: boolean = false;
  _id: string = "";
  cNames: any = [];
  coupenCategories: any = [];
  isloggedin: boolean = false;
  count: String = "";
  length: string = ""
  category: String = ""
  sortBy: String = ""
  constructor(private doctorService: DoctorService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private route: Router,

    private router: ActivatedRoute) {

  }
  ngAfterViewInit() {
    var self = this
    $('select').change(function () {
      self.search()

    });
  }
  ngOnInit() {
    this.getCoupenCat()
    this.search();
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
  }
  getCoupenCat() {

    this.doctorService
      .getCoupenCategories()
      .subscribe(res => {
        if (res.IsSuccess) {
          this.coupenCategories = res.Data
          setTimeout(() => {
            $('select').selectpicker('refresh')

          }, 1000);

        } else {
          this.ts.pop("error", "", res.Message)
        }

      })
  }

  searchCoupen(pageNo) {
    this.pageNo = pageNo;
    this.search();
    this.setPage()
  }
  previous() {
    this.pageNo = this.pageNo - 1;
    this.search()
    this.setPage()


  }
  next() {
    this.pageNo = this.pageNo + 1;
    this.search();
    this.setPage()



  }
  search() {
    this.noData = false



    let data = {
      "limit": this.limit,
      "page": this.pageNo,
      "s": this.keyword,
      "categories": [this.category],
      "sort": this.sortBy
    }
    if (this.category == '' || this.category == null)
      data.categories = []
    this.doctorService
      .searchCoupens(data)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.count = res.Data[0].count
          if (res.Data[0].length == 0)
            this.noData = true
          this.allCoupens = res.Data[0].coupons;
          this.length = res.Data[0].coupons.length
          this.pageCount = Math.ceil(res.Data[0].count / this.limit);

        } else {
          this.ts.pop("error", "", res.Message)
        }

      })
  }






  scroll() {
    $('html, body').animate({
      scrollTop: $('.content').offset().top - 20
    }, 'slow');
  }



  arrayOne(n: number): any[] {

    n = Math.floor(n)
    if (n != undefined)
      return Array(n);
    else
      return []
  }

  setPage() {

    $('.pitem').removeClass('active');
    $(`.pitem:eq(${(this.pageNo - 1)})`).addClass('active');
    if (this.pageNo == 1) {
      $('.previous').addClass('disabled');
      $('.next').removeClass('disabled');

    }
    if (this.pageNo > 1) {
      $('.previous').removeClass('disabled');
      $('.next').removeClass('disabled');

    }
    if (this.pageNo == this.pageCount) {
      $('.previous').removeClass('disabled');
      $('.next').addClass('disabled');

    }
  }
  viewCoupen(id) {

    this.route.navigate(["/patient/couponDetail/" + id]);

  }

  clear() {
    this._id = "";
    this.address = "";
    this.coupenDocs = [];
    this.description = "";
    this.price = "";
    this.valid_till = "";
    this.valid_from = "";
    this.discountedValue = "";
    this.title = "";
    this.couponCategory = "";
    $("#drpdownCat").selectpicker("refresh");
    this.cNames = []
  }

  getDiscountPercnt(coupen) {

    var N = (coupen.value - coupen.discountedValue) * 100 / coupen.value
    N = Math.ceil(N);

    return N;
  }





}
