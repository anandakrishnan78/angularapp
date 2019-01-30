import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorFlag = true;
  loginerror = false;
  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit() {
  }
  /**
   * function to check user credentials
   * @param username
   * @param password
   */
  validate(username: string, password: string) {
    if ((username === '') && (password === '')) {
      this.errorFlag = false;
      return;
    }
    this.loginService.login(username, password).subscribe((resp: any) => {
      console.log(resp);
      if (resp.stat > 0) {
        if (resp.role === 'u') {
          this.router.navigate(['/home/' + resp.id]);
        } else {
          this.router.navigate(['/admin/' + resp.id]);
        }
      } else {
        this.loginerror = true;
      }
    });
  }
}
