import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  /**
   * function to retrieve user details
   * @param id
   */
  getData(id: any): Observable<any> {
    let param = new HttpParams();
    param = param.append('id', id);
    return this.http.get('/api/home', { params: param });
  }
  /**
   *  function to request for updating new details
   * @param name
   * @param address
   * @param user
   * @param email
   * @param password
   * @param repassword
   * @param phone
   * @param id
   * @param pflag
   * @param imgFlag
   * @param imgString
   */
  edit(name: string, address: string, user: string, email: string, password: string, repassword: string, phone: any, id: any, pflag: any, imgFlag: any, imgString: any): Observable<any> {
    return this.http.post('/api/edit', { 'id': id, 'name': name, 'user': user, 'address': address, 'password': password, 'phone': phone, 'email': email, 'pflag': pflag, 'img': imgString, 'imgFlag': imgFlag }, { responseType: 'text' });

  }
}
