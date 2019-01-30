import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imgFlag = false;
  id: string;
  response: string;
  userData: any;
  nameFlag = true;
  responseFlag = true;
  passwordFlag = true;
  phoneFlag = true;
  emailFlag = true;
  matchFlag = true;
  pflag = false;
  imgString: string;
  imageUrl: string;
  resFlag: boolean;
  message: string;
  constructor(private route: ActivatedRoute, private homeService: HomeService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imageUrl = 'http://localhost:3002/pic/' + this.id + '.jpg';
    this.userData = {
      name: '',
      address: '',
      email: '',
      password: '',
      phone_no: 1
    };
  }
  /**
   *calling function to display userdetails on load
   */
  ngOnInit() {
    this.homeService.getData(this.id)
      .subscribe((userObject: any) => {
        this.userData = userObject;
      });
  }
  /**
   * function for redirecting to login page
   */
  logout() {
    this.router.navigate(['/login']);
  }
  /**
   * function to check password format
   * @param password
   */
  checkPassword(password: string) {
    this.pflag = true;
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if ((passwordFormat.test(password) !== true)) {
      console.log(this.passwordFlag);
      this.passwordFlag = false;
    }
  }
  /**
   * function for image load and display
   * @param event
   */
  image(event: any): void {
    const self = this;
    if (event.target.files[0]) {
      this.imgFlag = true;

      const reader = new FileReader();

      reader.onload = function () {
        self.imageUrl = reader.result;
      };
      reader.onloadend = function () {
        self.imgString = this.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
/**
 * function for checking home page edited details and issuing request to server for update
 * @param name
 * @param address
 * @param user
 * @param email
 * @param password
 * @param repassword
 * @param phone
 */
  edit(name: string, address: string, user: string, email: string, password: string, repassword: string, phone: any) {
    this.matchFlag = true;
    this.nameFlag = true;
    this.responseFlag = true;
    this.passwordFlag = true;
    this.phoneFlag = true;
    this.emailFlag = true;
    this.resFlag = false;
    if ((name === '') || (address === '') || (user === '') || (email === '') || (password === '') || (repassword === '') || (phone === '')) {
      this.responseFlag = false;
    }
    const emailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    const phoneFormat = /^\d{10}$/;
    const nameFormat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    if ((nameFormat.test(name) !== true)) {
      this.nameFlag = false;
    }

    if ((emailFormat.test(email) !== true)) {
      this.emailFlag = false;
    }
    if ((phoneFormat.test(phone) !== true)) {
      this.phoneFlag = false;
    }
    if (password !== repassword) {
      this.matchFlag = false;
    }
    if ((this.nameFlag) && (this.passwordFlag) && (this.phoneFlag) && (this.emailFlag) && (this.matchFlag) && (this.responseFlag)) {
      console.log(this.imgString);
      this.homeService.edit(name, address, user, email, password, repassword, phone, this.id, this.pflag, this.imgFlag, this.imgString).subscribe((resp: any) => {

        this.response = resp;

      });
    }
  }
}

