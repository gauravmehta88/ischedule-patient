


import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

import { DoctorService } from "../services/patient.service";
import { CookieService } from "../../landing/services/cookie.service";



declare var $: any;
declare var google, swal, MarkerClusterer, InfoBox: any;

@Component({
  selector: "app-appointments-list",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.css"],
  providers: [DoctorService, CookieService]
})
export class AppointmentsComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  isloggedin: boolean = false;
  loading: boolean = false;
  previousappointments: any = []
  upcomingappointments: any = []
  invoiceDetail: any = {}
  prescription: any = {};
  prescriptionDetails: any = {}
  invoice: any = {}
  appid: String = ""

  constructor(
    private doctorService: DoctorService,
    private cookieService: CookieService,
    private ts: ToasterService,
    private route: Router
  ) {
    setTimeout(() => {

    }, 1500);
  }

  ngOnInit() {
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
    this.getPastAppointments();
    this.getUpcomingAppointments()
  }

  viewPrec(app) {
    this.prescriptionDetails = app.presc
  }
  viewInvoice(app) {

    this.invoiceDetail = app.invoices

  }
  getPastAppointments() {
    this.doctorService.getPastAppointments().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.previousappointments = res.Data;

      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }



  getUpcomingAppointments() {
    this.doctorService.getUpcomingAppointments().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.upcomingappointments = res.Data;

      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }


  cancelAppointment(appId) {


    swal({
      title: "Are you sure wanto cancel this appointment ",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES  !"
    }).then(result => {
      console.log(result);
      if (result) {

        this.doctorService.cancelAppointment(appId).subscribe(res => {
          this.loading = false;
          if (res.IsSuccess) {
            this.ts.pop("success", "", "Appointment  successfully cancelled")
            this.getUpcomingAppointments()

          } else {
            this.ts.pop("error", "", res.Message)

          }
        });

      }
    });



  }

  rescheduleAppointment(appid, docid) {
    this.cookieService.setItem('appid', appid);

    this.route.navigate(["/patient/rescheduleAppointment/" + docid]);

  }

  getInvoiceSubTotal(invoiceDetail) {
    let subTotal = 0;

    if ($.isEmptyObject(invoiceDetail))
      return subTotal
    invoiceDetail.billItems.forEach(element => {
      subTotal = subTotal + parseInt(element.cost)
    });
    return subTotal

  }
  getInvoiceCost(invoiceDetail) {

    let subTotal = 0;
    if ($.isEmptyObject(invoiceDetail))
      return subTotal
    invoiceDetail.billItems.forEach(element => {
      subTotal = subTotal + parseInt(element.cost)
    });
    let discountInInt = subTotal * parseInt(invoiceDetail.discount) / 100;
    let taxtInInt = subTotal * parseInt(invoiceDetail.tax) / 100;

    return (subTotal - discountInInt + taxtInInt)
  }



}
