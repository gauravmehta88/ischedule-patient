import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../services/patient.service";

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
declare var $, swal;
declare var CKEDITOR, ckeditor;
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [DoctorService]
})

export class NotesComponent implements OnInit {
  query: string = ""
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  title: string = "";
  description: string = "";
  notes: any = [];
  _id: string = "";

  isEdit: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ts: ToasterService
  ) {

    this.getNotes()
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

  }

  getNotes() {
    this.doctorService
      .getNotes()
      .subscribe(res => {
        if (res.IsSuccess) {

          this.notes = res.Data;
        } else {
          this.ts.pop("error", "", res.Message)
        }

      })
  }
  editNote(note) {

    this.title = note.title;
    this.description = note.description;
    this.isEdit = true;
    this._id = note._id

  }
  editNotes() {
    if (this.title == "" || this.description == "") {
      this.ts.pop("error", "", "title or description is missing!");
      return false
    }

    let dataToSend = {
      "_id": this._id,
      "title": this.title,
      "description": this.description
    }
    this.doctorService
      .editNote(dataToSend)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Note edited successfully");
          this.getNotes()

          this.title = "";
          this.description = "";
          this.isEdit = false;


        } else
          this.ts.pop("error", "", res.Message)
      })
  }
  saveNotes() {

    if (this.title == "" || this.description == "") {
      this.ts.pop("error", "", "title or description is missing!");
      return false
    }

    let dataToSend = {

      "title": this.title,
      "description": this.description
    }
    this.doctorService
      .addNote(dataToSend)
      .subscribe(res => {
        if (res.IsSuccess) {
          this.ts.pop("success", "", "Note added successfully");
          this.getNotes()

          this.title = "";
          this.description = "";

        } else
          this.ts.pop("error", "", res.Message)
      })
  }

  deleteNotes(id) {


    swal({
      title: "Are you sure wanto delete this note?...",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK  !"
    }).then(result => {
      console.log(result);
      if (result) {

        this.doctorService
          .deleteNote(id)
          .subscribe(res => {
            if (res.IsSuccess) {
              this.ts.pop("success", "", "Note Delete successfully");
              this.getNotes();
            } else {
              this.ts.pop("error", "", res.Mesage)
            }
          })

      }
    });



  }
}
