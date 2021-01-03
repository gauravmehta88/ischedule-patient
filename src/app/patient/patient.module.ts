import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { routes } from "./patient.route";
import { PatientComponent } from "./patient.component";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";


import { TopBarComponent } from "./top-bar/top-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";

import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";

import { HttpModule } from "@angular/http";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { NgxStripeModule } from 'ngx-stripe';

const config: SocketIoConfig = { url: 'http://api.ischedulenow.com/ ', options: {} };


import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray
} from "@angular/forms";

import {
  ToasterContainerComponent,
  ToasterService,
  ToasterConfig,
  ToasterModule
} from "angular2-toaster";

import { CookieService } from "../landing/services/cookie.service";
import { SearchNotesPipe } from './search-notes.pipe';
import { SearchChatPipe } from './search-chat.pipe';
import { NotesComponent } from './notes/notes.component';

import { IndComponent } from './ind/ind.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { HeaderafterloginComponent } from './headerafterlogin/headerafterlogin.component';
import { FooterafterloginComponent } from './footerafterlogin/footerafterlogin.component';
import { ChatmessagesComponent } from './chatmessages/chatmessages.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';
import { RescheduleBookingDetailComponent } from './reschedule-booking-detail/reschedule-booking-detail.component';
import { PatientNewPasswordComponent } from './patient-new-password/patient-new-password.component';
import { PatientemailverificationComponent } from './patientemailverification/patientemailverification.component';
import { HealthReportComponent } from './health-report/health-report.component';
import { SettingsComponent } from './settings/settings.component';
import { BillComponent } from './bill/bill.component';
import { ShareRecordsComponent } from './share-records/share-records.component';
import { PayInvoiceComponent } from './pay-invoice/pay-invoice.component';
import { PayCoupenComponent } from './pay-coupen/pay-coupen.component';
import { MycoupensComponent } from './mycoupens/mycoupens.component';


@NgModule({
  declarations: [
    PatientComponent,
    PatientProfileComponent,
    TopBarComponent,
    SideBarComponent,

    SearchNotesPipe,
    SearchChatPipe,
    NotesComponent,

    IndComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    DoctorListComponent,
    DoctordetailPageComponent,
    BookingConfirmationComponent,
    BookingDetailComponent,
    CoupenComponent,
    CoupenDetailComponent,
    ForgotpasswordComponent,
    ForgotpasswordconfirmationComponent,
    ReviewCoupenComponent,
    ReviewDoctorComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    DashboardComponent,
    ProfileComponent,
    DocumentComponent,
    DocumentViewComponent,
    TermandconditionsComponent,
    PrivacyComponent,
    HeaderafterloginComponent,
    FooterafterloginComponent,
    ChatmessagesComponent,
    AppointmentsComponent,
    RescheduleAppointmentComponent,
    RescheduleBookingDetailComponent,
    PatientNewPasswordComponent,
    PatientemailverificationComponent,
    HealthReportComponent,
    SettingsComponent,
    BillComponent,
    ShareRecordsComponent,
    PayInvoiceComponent,
    PayCoupenComponent,
    MycoupensComponent,

  ],

  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    ToasterModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),

    TimepickerModule.forRoot(),
    SocketIoModule.forRoot(config),
    NgxStripeModule.forRoot("pk_test_51HuAkZCbXi3plYezlGPSbYKulBljXuobMJZ1XrpgzUNFa4j9YqQkkjjG26EqlmkJK8IZCCaeJHUQV7MnL7BYxHPe00THCEOiuw")

  ],
  providers: [CookieService]
})
export class PatientModule { }
