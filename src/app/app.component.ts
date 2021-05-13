import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FetchdataService } from './fetchdata.service';
import { DatePipe, formatCurrency } from '@angular/common';
import { Form, NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private fetchdataservice:FetchdataService,private datepipe:DatePipe){}

  title = 'slot ';
  pincode : any;
  date : string=Date();
  resdata: any;
  centers: any = [];
  intervalFn: any;
  intervalTime: number = 10;
  intervalTimeInSec: number;
  count: number = 0;
  vaccine: string="COVAXIN";
  min_age_limit: any = "18";
  min_age: number;
  checked: boolean = true;
  showtable: boolean = false;
  data: any = [];
  countdata: number = 0;
  available: boolean = false;
  audio = new Audio();
  submitted: boolean = true;


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

}


  checkSlot(val)
  {

    this.data = [];
    this.countdata = 0;
    this.count = 0;
    this.showtable = false;
    this.vaccine = val.vaccine;
    this.min_age = Number(val.min_age_limit);
    //this.min_age_limit = val.min_age_limit;
    if (this.intervalTime<=10)
    {
      this.intervalTime = 10;
    }
    console.log(this.vaccine);
    console.log(this.min_age);
      console.warn("date="+this.date);
      this.pincode = val.pincode;
      this.date = val.date;
    this.date = this.datepipe.transform(this.date, "dd-MM-yyyy");
    this.intervalTimeInSec = this.intervalTime * 1000;
    this.submitted = false;


    this.intervalFn = setInterval(() => {

      console.log(this.date);



      const params = new HttpParams().set('pincode', this.pincode).set('date', this.date);
      this.fetchdataservice.getData(params).subscribe((res: any) => {
        console.log("centers avilable="+res.centers.length)
        try {
          if (res.centers.length > 0) {
            this.resdata = res;
            this.count = this.count + 1;
            //console.log(res);
            //let centerid = resdata.data;
            console.log(this.resdata)
            console.log(this.resdata.centers[0].sessions[0].available_capacity);
            //console.log(this.resdata.centers[0].json().sessions);
            //console.log(this.resdata.centers.json()['sessions'])
            //console.log(this.resdata.json().centers);
            this.centers = this.resdata.centers;
            //console.log(this.centers)
            console.log(this.centers.length)



            for (let index = 0; index < this.centers.length; index++) {
              let center = this.centers[index];
              //console.log(center.center_id);
              let ses = center.sessions;
              for (let index = 0; index < ses.length; index++) {
                let session = ses[index];
                console.log(session.available_capacity);
                // console.warn(session.vaccine === this.vaccine);
                // console.log(session.min_age_limit);
                // console.log(this.min_age_limit);
                // console.warn(session.min_age_limit==this.min_age_limit);
                // console.warn((session.available_capacity > 0));
                if ((session.available_capacity > 0) && (session.vaccine === this.vaccine) && (session.min_age_limit === this.min_age)) {
                  console.log("slot available")

                  this.available = true;

                }
                else {
                  console.log("No slot  available")
                }

              }
              if (this.available === true) {
                this.data[this.countdata++] = center;
                console.log("data=" + this.data);
                this.showtable = true;
                this.available = false;
              }


            }

            if (this.showtable == true) {
              this.stopChecking();
              this.playAudio();
            }
          }
        }
        catch (error)
        {
          alert("No Data Found");
          location.reload();
        }

      });








    },this.intervalTimeInSec)

  }


  stopChecking()
  {

      this.submitted = true;
      clearInterval(this.intervalFn);

      this.audio.pause();
      this.audio.currentTime = 0;



  }

  playAudio(){

  this.audio.src = "beep.mp3";
  this.audio.load();
  this.audio.play();
  }
  info()
  {
    alert("Whenever slot will be available this site will inform you by ringing beep sound. "+
      "Here you have fully controls like, you can set time interval to find slot,set pincode,choose vaccine type,age,date. " +
      "Example: Sometimes centers are not available but this will check centers availability wherenver centers are available with slot it will inform you. " +
      "If You found any problem please refresh the page/clear cache & feel free to share bugs. " +
      "Here i have used co-WIN public APIs." +
      "You can also see center name & address whenever it is available."
    );
  }

}
