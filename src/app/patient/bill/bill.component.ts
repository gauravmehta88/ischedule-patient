


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

declare var $;

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [DoctorService]
})
export class BillComponent implements OnInit {
  invoices: any = [];
  isloggedin: boolean = false;
  loading: boolean = false;
  invoiceDetail: any = {}
  generated: any = [];
  pending: any = []
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  constructor(private doctorService: DoctorService,

    private cookieService: CookieService,
    private ts: ToasterService,
    private route: Router) { }

  ngOnInit() {

    this.getInvoices()
  }

  viewInvoice(invoiceDetail) {
    this.invoiceDetail = invoiceDetail
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

  getInvoiceSubTotal(invoiceDetail) {
    let subTotal = 0;

    if ($.isEmptyObject(invoiceDetail))
      return subTotal
    invoiceDetail.billItems.forEach(element => {
      subTotal = subTotal + parseInt(element.cost)
    });
    return subTotal

  }
  getInvoices() {
    this.doctorService.getPatientInvoice().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.invoices = res.Data;
        console.log(this.invoices)
        this.invoices.filter(res => { })
        this.generated = this.invoices.filter(word => word.status == 'Generated');
        this.pending = this.invoices.filter(word => word.status == 'Pending');

      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }
}
