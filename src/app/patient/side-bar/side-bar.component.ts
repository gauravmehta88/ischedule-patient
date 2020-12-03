import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"]
})
export class SideBarComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  profilePicPath: any = null;
  constructor() {
    this.firstName = localStorage.getItem("firstName");
    this.lastName = localStorage.getItem("lastName");
    this.profilePicPath = localStorage.getItem("profilePicPath");
    if (this.profilePicPath == "null") {
      this.profilePicPath = null;
    }
  }

  ngOnInit() { }
  isEmpty(str) {
    return (!str || 0 === str.length);
  }
}
