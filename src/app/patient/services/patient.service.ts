// import { window } from "rxjs/operator/window";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { environment } from "./../../../environments/environment";

import { CookieService } from "../../landing/services/cookie.service";

@Injectable()
export class DoctorService {
  constructor(
    private router: Router,
    private http: Http,
    private cookieService: CookieService
  ) { }

  cancelAppointment(appid) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .put(environment.baseURL + "api/patient/" + id + "/appointment/" + appid + "/cancel", {}, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          //  this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }




  getAllSpecialities() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(environment.baseURL + "api/allSpecialities?limit=10", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  getPastAppointments() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(environment.baseURL + "api/patient/" + id + '/pastAppointments', {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          //  this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  getUpcomingAppointments() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(environment.baseURL + "api/patient/" + id + '/upcomingAppointments', {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  getAllInsurances() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(environment.baseURL + "api/allInsurances?limit=10", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }


  dateWiseAvailableSlots(docId, dateOfAppointment) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(environment.baseURL + "api/doctor/" + docId + "/dateWiseAvailableSlots", { "forDate": dateOfAppointment }, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  getDashBoardData() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(environment.baseURL + "api/patient/" + id + "/dashboard", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }



  dayWiseSchedule(docId) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(environment.baseURL + "api/doctor/" + docId + "/dayWiseSchedule", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  rescheduleAppointment(patientData) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .put(
      environment.baseURL +
      "api/patient/" +
      id +
      "/appointment/" + patientData.appId + '/reschedule',
      patientData,
      {
        headers: headers
      }
      )
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  bookAppointment(patientData) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(
      environment.baseURL +
      "api/patient/" +
      id +
      "/bookAppointmentWithDoctorForPatient",
      { patientData: patientData },
      {
        headers: headers
      }
      )
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  saveMyPrefrence(data) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(
      environment.baseURL +
      "api/patient/" +
      id +
      "/reminder",
      data,
      {
        headers: headers
      }
      )
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  getPatientProfile() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(environment.baseURL + "api/patient/" + id, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  getPatientPrescription() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http

      .get(environment.baseURL + "api/patient/" + id + "/receipts/", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])

          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  editPatientProfile(patientData) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");


    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .put(environment.baseURL + "api/patient/" + id, patientData, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }


  addNote(noteData) {
    let id = this.cookieService.getItem("_id");

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(
      environment.baseURL +
      "api/patient/" +
      id +
      "/addNote",
      noteData,
      {
        headers: headers
      }
      )
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  editNote(noteData) {
    let id = this.cookieService.getItem("_id");

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .put(
      environment.baseURL +
      "api/patient/" +
      id +
      "/note/" + noteData._id,
      noteData,
      {
        headers: headers
      }
      )
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  getNotes() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));

    return this.http
      .get(environment.baseURL + "api/patient/" + id + "/notes", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }


  getDoctorList() {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(environment.baseURL + "api/doctor/listAll", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  searchDoctor(data) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(environment.baseURL + "api/doctor/searchDoctor", data, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }



  deleteNote(noteId) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));

    return this.http
      .delete(environment.baseURL + "api/patient/" + id + "/note/" + noteId, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }



  addDocument(docData) {
    let id = this.cookieService.getItem("_id");

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(
      environment.baseURL +
      "api/patient/" +
      id +
      "/addDocument",
      docData,
      {
        headers: headers
      }
      )
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  getDocuments() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));

    return this.http
      .get(environment.baseURL + "api/patient/" + id + "/documents", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  deleteDocument(docId) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));

    return this.http
      .delete(environment.baseURL + "api/patient/" + id + "/document/" + docId, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  shareDocument(doctorId, docId) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));

    return this.http
      .put(environment.baseURL + `api/patient/${id}/shareDocumentWithDoctor`, {
        "documentId": docId, "doctorId": [doctorId]
      }, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }


  shareGivenPatientAllDocumentsWithGivenDoctor(doctorId) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));

    return this.http
      .put(environment.baseURL + `api/patient/${id}/shareGivenPatientAllDocumentsWithGivenDoctor`, {
        "doctorId": [doctorId]
      }, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }




  updateDoctorPublicProfileView(id) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    return this.http
      .put(environment.baseURL + "api/doctor/" + id + '/incrementProfileView', {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  getDoctorPublicProfile(id) {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    return this.http
      .get(environment.baseURL + "api/doctor/" + id, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  unshare(data) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();
    headers.append("Authorization", this.cookieService.getItem("Token"));

    headers.append("Content-Type", "application/json");
    return this.http
      .put(environment.baseURL + "api/patient/" + id + "/unShareDocumentWithDoctor", data, {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }


  getOnlineUsers() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();
    headers.append("Authorization", this.cookieService.getItem("Token"));

    headers.append("Content-Type", "application/json");
    return this.http
      .get(environment.baseURL + "api/patient/" + id + "/chatRooms", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }
  getPatientInvoice() {
    let patientId = this.cookieService.getItem("_id");
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));


    return this.http
      .get(environment.baseURL + "api/patient/" + patientId + "/invoices", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  getOldChatMessages(chatroomId) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();
    headers.append("Authorization", this.cookieService.getItem("Token"));

    headers.append("Content-Type", "application/json");
    return this.http
      .get(environment.baseURL + "api/patient/" + id + "/chatRoom/" + chatroomId + "/chat", {
        headers: headers
      })
      .map(res => res.json())
      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  getCoupens() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(
      environment.baseURL + "api/coupons",


      {
        headers: headers
      }
      )
      .map(res => res.json())

      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }

  getCoupenCategories() {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .get(
      environment.baseURL + "api/couponCategories",


      {
        headers: headers
      }
      )
      .map(res => res.json())

      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }


  searchCoupens(data) {
    let id = this.cookieService.getItem("_id");
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.cookieService.getItem("Token"));
    return this.http
      .post(
      environment.baseURL + "api/searchCoupon", data,

      {
        headers: headers
      }
      )
      .map(res => res.json())

      .catch(e => {
        if (e.status === 401) {
          this.router.navigate(['/patient/login'])
          console.log("UnAuth");
        }
        if (e.ok == false) {
          return "1";
        }
        return [];
      });
  }


}
