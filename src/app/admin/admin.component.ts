import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  id: any;
  userdetails: any;
  response: string;
  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
/**
 * issue a call for retrieving userdetails
 */
  ngOnInit() {
    this.adminService.getData(this.id)
      .subscribe((userObject: any) => {
        this.userdetails = userObject.data;
        console.log(this.userdetails);
      });
  }
  /**
   * Redirection to login page
   */
  logout() {
    this.router.navigate(['/login']);
  }
  /**
   * issuing call for deleting an entry
   * @param id
   */
  delete(id: any) {
    this.adminService.delete(id)
      .subscribe((resp: any) => {
       this.response = resp;
      });
  }
  /**
   *issuing call for providing admin privilege
   * @param id
   */
  change(id: any) {
    this.adminService.change(id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.response = resp;
      });
  }

}
