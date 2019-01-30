import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nameFlag = true;
  responseFlag = true;
  passwordFlag = true;
  phoneFlag = true;
  emailFlag = true;
  matchFlag = true;
  userFlag = true;

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }
/**
 * function to perform validation of userdetails
 * @param name
 * @param address
 * @param user
 * @param email
 * @param password
 * @param repassword
 * @param phone
 */
  validate(name: string, address: string, user: string, email: string, password: string, repassword: string, phone: any) {
    // this.nameFlag = true;
    // this.responseFlag = true;
    // this.passwordFlag = true;
    // this.phoneFlag = true;
    // this.emailFlag = true;
    // this.matchFlag = true;
    // this.userFlag = true;

    if ((name === '') || (address === '') || (user === '') || (email === '') || (password === '') || (repassword === '') || (phone === '')) {
      this.responseFlag = false;
    } else {
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
        this.registerService.register(name, address, user, email, password, phone).subscribe((resp: any) => {
          if (resp.stat === 1) {
            this.router.navigate(['/home/' + resp.id]);
          } else {
            this.userFlag = false;
          }
        });

      }
    }
  }

}
