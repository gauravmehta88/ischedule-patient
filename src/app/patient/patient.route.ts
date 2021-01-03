import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PatientComponent } from "./patient.component";

import { PatientProfileComponent } from "./patient-profile/patient-profile.component";


import { IndComponent } from './ind/ind.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctordetailPageComponent } from './doctordetail-page/doctordetail-page.component';

import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { CoupenComponent } from './coupen/coupen.component';
import { CoupenDetailComponent } from './coupen-detail/coupen-detail.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordconfirmationComponent } from './forgotpasswordconfirmation/forgotpasswordconfirmation.component';
import { ReviewCoupenComponent } from './review-coupen/review-coupen.component';
import { ReviewDoctorComponent } from './review-doctor/review-doctor.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DocumentComponent } from './document/document.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { TermandconditionsComponent } from './termandconditions/termandconditions.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ChatmessagesComponent } from './chatmessages/chatmessages.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';
import { RescheduleBookingDetailComponent } from './reschedule-booking-detail/reschedule-booking-detail.component';
import { PatientNewPasswordComponent } from './patient-new-password/patient-new-password.component';
import { PatientemailverificationComponent } from './patientemailverification/patientemailverification.component';
import { HealthReportComponent } from './health-report/health-report.component';
import { SettingsComponent } from './settings/settings.component';
import { BillComponent } from './bill/bill.component';
import { PayInvoiceComponent } from './pay-invoice/pay-invoice.component';
import { ShareRecordsComponent } from './share-records/share-records.component';
import { PayCoupenComponent } from './pay-coupen/pay-coupen.component';
import { MycoupensComponent } from './mycoupens/mycoupens.component';

export const routes: Routes = [
  {
    path: "",
    component: PatientComponent,
    children: [
      { path: "", component: IndComponent, pathMatch: "full" },
      { path: "login", component: LoginComponent, pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent, pathMatch: "full" },
      { path: "profile", component: ProfileComponent, pathMatch: "full" },
      { path: "terms", component: TermandconditionsComponent, pathMatch: "full" },
      { path: "privacy", component: PrivacyComponent, pathMatch: "full" },
      { path: "healthreport", component: HealthReportComponent, pathMatch: "full" },
      { path: "settings", component: SettingsComponent, pathMatch: "full" },
      { path: "bill", component: BillComponent, pathMatch: "full" },
      { path: "pay-invoice/:invoiceId", component: PayInvoiceComponent, pathMatch: "full" },
      { path: "shareRecords", component: ShareRecordsComponent, pathMatch: "full" },
      { path: "pay-coupen/:coupenId", component: PayCoupenComponent, pathMatch: "full" },

      { path: "myCoupen", component: MycoupensComponent, pathMatch: "full" },

      { path: "coupon", component: CoupenComponent, pathMatch: "full" },
      { path: "couponDetail/:id", component: CoupenDetailComponent, pathMatch: "full" },
      { path: "forgotPassword", component: ForgotpasswordComponent, pathMatch: "full" },
      { path: "forgotPasswordconfirmation", component: ForgotpasswordconfirmationComponent, pathMatch: "full" },
      { path: "reviewCoupen/:id", component: ReviewCoupenComponent, pathMatch: "full" },
      { path: "reviewDoctor/:id", component: ReviewDoctorComponent, pathMatch: "full" },
      { path: "aboutus", component: AboutUsComponent, pathMatch: "full" },
      { path: "contactus", component: ContactUsComponent, pathMatch: "full" },
      { path: "faq", component: FaqComponent, pathMatch: "full" },
      { path: "documents", component: DocumentComponent, pathMatch: "full" },
      { path: "documentView", component: DocumentViewComponent, pathMatch: "full" },
      { path: "appointments", component: AppointmentsComponent, pathMatch: "full" },



      { path: "register", component: RegisterComponent, pathMatch: "full" },
      { path: "doctorList", component: DoctorListComponent, pathMatch: "full" },
      { path: "bookingDetail", component: BookingDetailComponent, pathMatch: "full" },
      { path: "rebookingDetail", component: RescheduleBookingDetailComponent, pathMatch: "full" },

      { path: "bookingConfirmation", component: BookingConfirmationComponent, pathMatch: "full" },

      { path: "chat", component: ChatmessagesComponent, pathMatch: "full" },
      //  { path: "ind", component: IndComponent, pathMatch: "full" },


      {
        path: "profile2",
        component: PatientProfileComponent,
        pathMatch: "full"
      },

      {
        path: "doctorDetail/:id",
        component: DoctordetailPageComponent,
        pathMatch: "full"
      },
      {
        path: "rescheduleAppointment/:id",
        component: RescheduleAppointmentComponent,
        pathMatch: "full"
      },
      {
        path: "patientNewPassword",
        component: PatientNewPasswordComponent,
        pathMatch: "full"
      },
      {
        path: "patientEmailVerification",
        component: PatientemailverificationComponent,
        pathMatch: "full"
      },
    ]
  }
];
