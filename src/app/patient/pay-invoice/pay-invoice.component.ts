import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import { ActivatedRoute } from "@angular/router";


import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig
} from "angular2-toaster";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';



import { DoctorService } from "../services/patient.service";

@Component({
  selector: 'app-pay-invoice',
  templateUrl: './pay-invoice.component.html',
  styleUrls: ['./pay-invoice.component.css'],
  providers: [DoctorService]
})
export class PayInvoiceComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  @ViewChild(StripeCardComponent, { static: false }) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;
  loading: boolean = false
  isloggedin: boolean = false

  constructor(private fb: FormBuilder, private stripeService: StripeService, private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private ts: ToasterService) { }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }


  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);

          this.doctorService.payPatientDue({ stripeToken: result.token.id }, this.route.snapshot.paramMap.get("invoiceId")).subscribe(res => {
            console.log(res);
            if (res.IsSuccess) {
              console.log('came in success response....');
              this.ts.pop('success', '', 'Payment done!')

              setTimeout(() => {
                this.router.navigate(["/patient/dashboard"]);
              }, 3000);

            } else {
              console.log('came in failure response....');
            }
          });



        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
