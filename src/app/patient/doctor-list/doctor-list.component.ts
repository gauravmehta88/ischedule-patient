


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
declare var google, MarkerClusterer, InfoBox: any;

@Component({
  selector: "app-doctor-list",
  templateUrl: "./doctor-list.component.html",
  styleUrls: ["./doctor-list.component.css"],
  providers: [DoctorService, CookieService]
})
export class DoctorListComponent implements OnInit {
  public config: ToasterConfig = new ToasterConfig({ limit: 1 });

  loading: boolean = false;
  allDoctors: any = [];
  pageNo: number = 1;
  count: number = 0;
  limit: number = 15;
  pageCount: number = 1;
  nametosearch: string = "";
  zip: string = "";
  insurance: any = "";
  speciality: any = ""
  recordCount: number = 0;
  isloggedin: boolean = false;
  doctorsMapList: any = []
  allSpecialities: any = [];
  allInsurances: any = [];
  gender: String = ""
  language: String = "";
  rating: String = "";
  noData: boolean = false;
  geoLocation: any = []
  dateOfAppointment: any = new Date();

  constructor(

    private doctorService: DoctorService,
    private cookieService: CookieService,
    private ts: ToasterService,
    private route: Router
  ) {
    this.iniDate();
    // this.loadGoogle()
  }

  iniDate() {
    var todayTime = new Date();


    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var doa = year + "-" + month + "-" + day;

    this.dateOfAppointment = doa
    //  self.searchSlots()
    this.searchDoctor(0)
  }
  ngAfterViewInit() {



    var self = this
    $('select').change(function () {
      self.searchDoctor(0)

    });

    var self = this;
    $("#booking_date").dateDropper({
      largeDefault: true

    });

    $("#booking_date").change(function () {
      var todayTime = new Date($(this).val());

      this.dayName = (todayTime.toDateString())
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var doa = year + "-" + month + "-" + day;

      self.dateOfAppointment = doa
      //  self.searchSlots()
      self.searchDoctor(0)
    });



    $("#searchBox").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "http://dev.virtualearth.net/REST/v1/Locations",
          dataType: "jsonp",
          data: {
            key: "Aol3B6WbArCZMliaTOCrcSLjEtur7Y4A6uthDqQfehUjvGWhQZNhG8p1JOwraB-W",
            q: request.term
          },
          jsonp: "jsonp",
          success: function (data) {
            var result = data.resourceSets[0];
            if (result) {
              if (result.estimatedTotal > 0) {
                response($.map(result.resources, function (item) {
                  return {
                    data: item,
                    label: item.name + ' (' + item.address.countryRegion + ')',
                    value: item.name
                  }
                }));
              }
            }
          }
        });
      },
      minLength: 1,
      change: function (event, ui) {
        if (!ui.item)
          $("#searchBox").val('');
      },
      select: function (event, ui) {

        self.geoLocation = ui.item.data
        self.displaySelectedItem(ui.item.data);
      }
    });


  }

  displaySelectedItem(item) {
    var self = this;

    self.geoLocation = item.point.coordinates
    self.searchDoctor(0)

  }
  ngOnInit() {
    this.loading = true;
    this.nametosearch = this.cookieService.getItem('doctorName')
    this.zip = this.cookieService.getItem('zipCode')
    this.insurance = this.cookieService.getItem('insurance')
    // this.speciality = this.cookieService.getItem('specialty')
    this.getDoctorList();
    this.getAllInsurances();
    this.getAllSpecialities()
    if (this.cookieService.getItem('_id') != null) {
      this.isloggedin = true
    }
  }

  getAllInsurances() {
    this.doctorService.getAllInsurances().subscribe(res => {
      console.log(res);
      if (res.IsSuccess) {
        this.allInsurances = res.Data;
        //  this.insurance = this.cookieService.getItem('insurance')
        $('select').selectpicker('refresh')
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
        $('select').selectpicker('refresh')
      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }


  searchDoctorList() {

  }

  searchDoctor(pageNo) {

    this.pageNo = pageNo;
    this.getDoctorList();
    this.setPage()
  }
  previous() {
    this.pageNo = this.pageNo - 1;
    this.getDoctorList()
    this.setPage()


  }
  next() {
    this.pageNo = this.pageNo + 1;
    this.getDoctorList();
    this.setPage()



  }

  setPage() {

    $('.pitem').removeClass('active');
    $(`.pitem:eq(${(this.pageNo - 1)})`).addClass('active');
    if (this.pageNo == 1) {
      $('.previous').addClass('disabled');
      $('.next').removeClass('disabled');

    }
    if (this.pageNo > 1) {
      $('.previous').removeClass('disabled');
      $('.next').removeClass('disabled');

    }
    if (this.pageNo == this.pageCount) {
      $('.previous').removeClass('disabled');
      $('.next').addClass('disabled');

    }
  }


  slotSelected(slot, doctor) {


    let patData = {


      "service": "5cdd04223c8d0d098422bdeb",
      "dateOfAppointment": this.dateOfAppointment,
      "timeOfAppointment": slot,
      "doctorId": doctor._id,
      "doctorName": doctor.firstName + ' ' + doctor.lastName


    }
    localStorage.setItem('patientData', JSON.stringify(patData));
    this.route.navigate(["/patient/bookingDetail"]);




  }

  arrayOne(n: number): any[] {
    if (n == undefined)
      n = 0
    n = Math.ceil(n)
    if (n != undefined)
      return Array(n);
  }
  getDoctorList() {
    this.noData = false
    let datatosearch = {
      geoLocation: this.geoLocation,
      nameToSearch: this.nametosearch,
      zip: this.zip,
      speciality: [this.speciality],
      insurance: [this.insurance],
      "limit": this.limit,
      "page": this.pageNo,

      "genders": [this.gender],
      "languages": [this.language],
      "sortBy": this.rating,
      //   "date": this.dateOfAppointment
    }

    if (this.nametosearch == '' || this.nametosearch == null)
      datatosearch.nameToSearch = ''
    if (this.zip == '' || this.zip == null)
      datatosearch.zip = ''
    if (this.insurance == '' || this.insurance == null)
      datatosearch.insurance = []
    if (this.speciality == '' || this.speciality == null)
      datatosearch.speciality = []
    if (this.gender == '' || this.gender == null)
      datatosearch.genders = []
    if (this.language == '' || this.language == null)
      datatosearch.languages = []
    this.doctorService.searchDoctor(datatosearch).subscribe(res => {
      console.log(res);
      this.loading = false;
      if (res.IsSuccess) {
        this.cookieService.removeItem('insurance')
        setTimeout(() => {
          $('select').selectpicker('refresh');

        }, 1500);
        this.allDoctors = res.Data[0].doctors;
        this.count = res.Data[0].count;
        if (this.count == 0)
          this.noData = true
        this.pageCount = Math.ceil(this.count / this.limit);
        this.recordCount = this.allDoctors.length;

        this.allDoctors.forEach(doctor => {
          var dMap = {
            name: 'Dr. ' + doctor.firstName + " " + doctor.lastName,
            location_latitude: 48.873792,
            location_longitude: 2.295028,
            map_image_url: doctor.profilePicPath,
            type: doctor.designation,
            url_detail: 'detail-page.html',
            name_point: 'Dr. ' + doctor.firstName + " " + doctor.lastName,
            description_point: doctor.address,
            get_directions_start_address: doctor.address,
            phone: doctor.mobileNumber
          }
          this.doctorsMapList.push(dMap)
        });




      } else {
        this.ts.pop("error", "", res.Message)
      }
    });
  }






  bookAppointment(doctor) {

    this.route.navigate(["/bookAppointmentSlot/" + doctor._id + "/" + doctor.firstName]);
  }
  loadGoogle() {
    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
      });
      const card = document.getElementById("pac-card");
      const input = document.getElementById("pac-input");
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
      const autocomplete = new google.maps.places.Autocomplete(input);
      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);
      // Set the data fields to return when the user selects a place.
      autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
      const infowindow = new google.maps.InfoWindow();
      const infowindowContent = document.getElementById("infowindow-content");
      infowindow.setContent(infowindowContent);
      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      });
      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        let address = "";

        if (place.address_components) {
          address = [
            (place.address_components[0] &&
              place.address_components[0].short_name) ||
            "",
            (place.address_components[1] &&
              place.address_components[1].short_name) ||
            "",
            (place.address_components[2] &&
              place.address_components[2].short_name) ||
            "",
          ].join(" ");
        }
        infowindowContent.children["place-icon"].src = place.icon;
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = address;
        infowindow.open(map, marker);
      });

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      function setupClickListener(id, types) {
        const radioButton = document.getElementById(id);
        radioButton.addEventListener("click", () => {
          autocomplete.setTypes(types);
        });
      }
      setupClickListener("changetype-all", []);
      setupClickListener("changetype-address", ["address"]);
      setupClickListener("changetype-establishment", ["establishment"]);
      setupClickListener("changetype-geocode", ["geocode"]);
      document
        .getElementById("use-strict-bounds")
        .addEventListener("click", function () {

          autocomplete.setOptions({ strictBounds: true });
        });
    }
  }
  loadMap() {

    (function (A) {
      if (!Array.prototype.forEach)
        A.forEach = A.forEach || function (action, that) {
          for (var i = 0, l = this.length; i < l; i++)
            if (i in this)
              action.call(that, this[i], i, this);
        };

    })(Array.prototype);

    var
      mapObject,
      markers = [],
      markersData = {
        'Doctors': this.doctorsMapList

      };

    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(48.865633, 2.321236),
      mapTypeId: google.maps.MapTypeId.ROADMAP,

      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      panControl: false,
      panControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      scrollwheel: false,
      scaleControl: false,
      scaleControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      styles: [
        {
          "featureType": "landscape",
          "stylers": [
            {
              "hue": "#FFBB00"
            },
            {
              "saturation": 43.400000000000006
            },
            {
              "lightness": 37.599999999999994
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "road.highway",
          "stylers": [
            {
              "hue": "#FFC200"
            },
            {
              "saturation": -61.8
            },
            {
              "lightness": 45.599999999999994
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            {
              "hue": "#FF0300"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 51.19999999999999
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "hue": "#FF0300"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 52
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "hue": "#0078FF"
            },
            {
              "saturation": -13.200000000000003
            },
            {
              "lightness": 2.4000000000000057
            },
            {
              "gamma": 1
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "hue": "#00FF6A"
            },
            {
              "saturation": -1.0989010989011234
            },
            {
              "lightness": 11.200000000000017
            },
            {
              "gamma": 1
            }
          ]
        }
      ]
    };
    var
      marker;
    mapObject = new google.maps.Map(document.getElementById('map_listing'), mapOptions);
    for (var key in markersData)
      markersData[key].forEach(function (item) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
          map: mapObject,
          icon: 'img/pins/' + key + '.png',
        });

        if ('undefined' === typeof markers[key])
          markers[key] = [];
        markers[key].push(marker);
        google.maps.event.addListener(marker, 'click', (function () {
          closeInfoBox();
          getInfoBox(item).open(mapObject, this);
          mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
        }));


      });



    function toggleMarkers(category) {
      hideAllMarkers();
      closeInfoBox();

      if ('undefined' === typeof markers[category])
        return false;
      markers[category].forEach(function (marker) {
        marker.setMap(mapObject);
        marker.setAnimation(google.maps.Animation.DROP);

      });
    };

    new MarkerClusterer(mapObject, markers[key]);

    function hideAllMarkers() {
      for (var key in markers)
        markers[key].forEach(function (marker) {
          marker.setMap(null);
        });
    };

    function closeInfoBox() {
      $('div.infoBox').remove();
    };

    function getInfoBox(item) {
      return new InfoBox({
        content:
          '<div class="marker_info">' +
          '<figure><a href=' + item.url_detail + '><img src="' + item.map_image_url + '" alt="Image"></a></figure>' +
          '<small>' + item.type + '</small>' +
          '<h3><a href=' + item.url_detail + '>' + item.name_point + '</a></h3>' +
          '<span>' + item.description_point + '</span>' +
          '<div class="marker_tools">' +
          '<form action="http://maps.google.com/maps" method="get" target="_blank" style="display:inline-block""><input name="saddr" value="' + item.get_directions_start_address + '" type="hidden"><input type="hidden" name="daddr" value="' + item.location_latitude + ',' + item.location_longitude + '"><button type="submit" value="Get directions" class="btn_infobox_get_directions">Directions</button></form>' +
          '<a href="tel://' + item.phone + '" class="btn_infobox_phone">' + item.phone + '</a>' +
          '</div>' +
          '</div>',
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(10, 105),
        closeBoxMargin: '',
        closeBoxURL: "img/close_infobox.png",
        isHidden: false,
        alignBottom: true,
        pane: 'floatPane',
        enableEventPropagation: true
      });
    };

    function onHtmlClick(location_type, key) {
      google.maps.event.trigger(markers[location_type][key], "click");
    }
  }
}
