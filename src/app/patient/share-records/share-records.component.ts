


import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";
import * as filestack from 'filestack-js';
const client = filestack.init('AGqWW8kQNRqi122GGl1nvz');
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


declare var $, swal;
declare var CKEDITOR, ckeditor;
@Component({
  selector: 'app-share-records',
  templateUrl: './share-records.component.html',
  styleUrls: ['./share-records.component.css'],
  providers: [DoctorService, CookieService]
})
export class ShareRecordsComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });
  loading: boolean = false;
  documents: any = [];
  title: string = "";
  description: string = "";
  documentUrl: string = "";
  documentType: string = "";
  documentStatus: string = "";
  isPrivate: boolean = false;
  docToShare: string = "";
  isloggedin: boolean = false;
  private: boolean = false;
  doctorId: String = ""
  doctorIdall: String = ""
  doctor: any = {}
  sharedWith: any = [];
  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
    , private cookieService: CookieService
  ) { this.getDocuments(); }




  getDocuments() {
    this.doctorService
      .getDocuments()
      .subscribe(res => {
        if (res.IsSuccess) {

          this.documents = res.Data;
        } else {
          this.ts.pop("error", "", res.Message)
        }

      })

  }

  deleteDoc(id) {


    swal({
      title: "Are you sure wanto delete this document?...",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK  !"
    }).then(result => {
      console.log(result);
      if (result) {

        this.doctorService
          .deleteDocument(id)
          .subscribe(res => {
            if (res.IsSuccess) {
              this.ts.pop("success", "", "Document Delete successfully");
              this.getDocuments();
            } else {
              this.ts.pop("error", "", res.Mesage)
            }
          })

      }
    });
  }


  share() {
    if ($('#searchDoctor').val() == "" || $('#searchDoctor').val() == undefined) {
      this.ts.pop("error", "", "select a doctor")

      return false;
    }

    else {
      this.doctorService
        .shareDocument($('#searchDoctor').val(), this.docToShare)
        .subscribe(res => {
          console.log(res)
          if (res.IsSuccess) {
            this.ts.pop("success", "", "Document shared successfully");
            $('#share-document').modal('hide');
            this.getDocuments()
          } else {
            this.ts.pop("error", "", res.Message)
          }
        })
    }
  }

  shareAllDoc() {
    if ($('#searchDoctorforall').val() == "" || $('#searchDoctorforall').val() == undefined) {
      this.ts.pop("error", "", "select a doctor")

      return false;
    }

    else {
      this.doctorService
        .shareGivenPatientAllDocumentsWithGivenDoctor($('#searchDoctorforall').val())
        .subscribe(res => {
          console.log(res)
          if (res.IsSuccess) {
            this.ts.pop("success", "", "All Documents shared successfully");
            $('#share-all-document').modal('hide');
            this.getDocuments()
          } else {
            this.ts.pop("error", "", res.Message)
          }
        })
    }
  }

  saveDocument() {

    if (this.documentUrl == "" || this.description == "" || this.title == "" || this.documentType == "" || this.documentStatus == "") {

      this.ts.pop("error", "", "please fill all required fields");
      return false;
    }

    let dataToSend = {
      "title": this.title,
      "description": this.description,
      "documentUrl": this.documentUrl,
      "documentType": this.documentType,
      "documentStatus": this.documentStatus,
      "isPrivate": this.isPrivate,

    }

    this.doctorService
      .addDocument(dataToSend)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Document saved successfully");

          this.description = "";
          this.title = "";
          this.documentUrl = "";
          this.documentType = "";
          this.documentStatus = ""
          this.documentUrl = "";


        } else {
          this.ts.pop("error", "", res.Message)
        }

      })


  }
  shareUrl(docId) {
    console.log(docId)
    $('.selectized').attr('style', 'display:none')
    this.docToShare = docId._id;
    this.sharedWith = docId.shared_with_doctor_id;

  }

  shareAllUrl() {

    $('.selectized').attr('style', 'display:none')



  }
  unshare(docId) {

    var data = {
      "documentId": this.docToShare,
      "doctorId": docId
    }
    this.doctorService.unshare(data).subscribe(res => {
      this.ts.pop("success", "", "unshared");
      $('#share-document').modal('hide')
      this.getDocuments();

    })
  }
  getDoctorPublicProfile(id) {
    this.doctorService.getDoctorPublicProfile(id).subscribe(res => {
      this.loading = false;

      if (res.IsSuccess) {
        this.doctor = res.Data;
      } else {
        this.ts.pop("error", "", res.Message);
      }
    });
  }
  ngOnInit() {
    this.initSelectize();

  }


  initSelectize() {
    console.log("Enter in the Selectize");

    let self = this;
    var $select = $("#searchDoctor").selectize({
      delimiter: ",",
      persist: false,
      placeholder: "Search Doctor",
      valueField: "_id",
      labelField: "firstName",
      searchField: "firstName",
      maxItems: 1,
      preload: "focus",

      load: function (query, callback) {
        $.ajax({
          url:
            "http://api.ischedulenow.com/api/patient/" +
            self.cookieService.getItem("_id") +
            "/searchDoctorByName",
          type: "POST",
          headers: {
            Authorization: self.cookieService.getItem("Token"),
            Accept: "application/json"
          },
          contentType: "application/json",
          data: JSON.stringify({ stringToMatch: query }),

          dataType: "json",

          error: function () {
            callback();
          },
          success: function (res) {
            console.log(res);
            if (res != null && res.Data)
              res.Data.forEach(element => {
                element.firstName =
                  "Dr. " +
                  element.firstName.charAt(0).toUpperCase() +
                  element.firstName.slice(1) +
                  " " +
                  element.lastName.charAt(0).toUpperCase() +
                  element.lastName.slice(1);
              });
            // if(res.specialData && res.specialData.length > 0)
            //  {  self.setHTML(res); }
            // console.log('Is it calling res.data',res.data);
            callback(res.Data);
          }
        });
      }
    });

    var $select = $("#searchDoctorforall").selectize({
      delimiter: ",",
      persist: false,
      placeholder: "Search Doctor",
      valueField: "_id",
      labelField: "firstName",
      searchField: "firstName",
      maxItems: 1,
      preload: "focus",

      load: function (query, callback) {
        $.ajax({
          url:
            "http://api.ischedulenow.com/api/patient/" +
            self.cookieService.getItem("_id") +
            "/searchDoctorByName",
          type: "POST",
          headers: {
            Authorization: self.cookieService.getItem("Token"),
            Accept: "application/json"
          },
          contentType: "application/json",
          data: JSON.stringify({ stringToMatch: query }),

          dataType: "json",

          error: function () {
            callback();
          },
          success: function (res) {
            console.log(res);
            if (res != null && res.Data)
              res.Data.forEach(element => {
                element.firstName =
                  "Dr. " +
                  element.firstName.charAt(0).toUpperCase() +
                  element.firstName.slice(1) +
                  " " +
                  element.lastName.charAt(0).toUpperCase() +
                  element.lastName.slice(1);
              });
            // if(res.specialData && res.specialData.length > 0)
            //  {  self.setHTML(res); }
            // console.log('Is it calling res.data',res.data);
            callback(res.Data);
          }
        });
      }
    });

    console.log($select[0]);
    // this.selectize = $select[0].selectize;
  }



  ngAfterViewInit() {
    setTimeout(() => {
      $("select").selectpicker();
    }, 500);
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true


    }
  }


  uploadDocument() {
    const options = {
      onFileUploadFinished: file => {
        // If you throw any error in this function it will reject the file selection.
        // The error message will be displayed to the user as an alert.
        console.log(file)
        this.documentUrl = file.url
      }
    };


    client.picker(options).open();
  }

}

