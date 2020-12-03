


import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";
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
import { CookieService } from "../../landing/services/cookie.service";

declare var $, swal, HeaderVideo, google, MarkerClusterer;

@Component({
  selector: 'app-ind',
  templateUrl: './ind.component.html',
  styleUrls: ['./ind.component.css'],
  providers: [DoctorService]
})
export class IndComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  allInsurances: any = [];
  loading: boolean = false;
  insurance: any = "";
  doctorName: any = "";
  zipCode: any = "";
  specialityId: any = ""
  allCoupens: any = []
  allSpecialities: any = []
  isloggedin: boolean = false
  constructor(private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService,
    private cookieService: CookieService,
    private _route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
    this.getAllInsurances();

    this.getAllSpecialities();
    this.getCoupens();

  }
  getAllInsurances() {
    this.doctorService.getAllInsurances().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allInsurances = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  getAllSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allSpecialities = res.Data;
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }

  searchDoctorBySpecialty(specialityId) {
    this.specialityId = specialityId;
    this.searchDoctor()
  }
  searchDoctor() {
    console.log(this.doctorName, this.insurance, this.zipCode)

    this.cookieService.setItem('doctorName', this.doctorName)
    this.cookieService.setItem('insurance', this.insurance)
    this.cookieService.setItem('specialty', this.specialityId)

    this.cookieService.setItem('zipCode', this.zipCode);
    this.router.navigate(["/patient/doctorList"]);


  }
  ngAfterViewInit() {
    HeaderVideo.init({
      container: $('.header-video'),
      header: $('.header-video--media'),
      videoTrigger: $("#video-trigger"),
      autoPlayVideo: true
    });


  }
  viewCoupen(id) {

    this.router.navigate(["/patient/couponDetail/" + id]);

  }

  getCoupens() {
    this.doctorService.getCoupens().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allCoupens = res.Data[0].coupons
        setTimeout(() => {
          $('.owl-carousel').owlCarousel('destroy');
          $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 3
              },
              1000: {
                items: 5
              }
            }
          })
        }, 1000);

      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }






}
