import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  /**
   * function to issue request for new user registration
   * @param name
   * @param address
   * @param user
   * @param email
   * @param password
   * @param phone
   */
  register(name: string, address: string, user: string, email: string, password: string, phone: any): Observable<any> {
    let param = new HttpParams();
    param = param.append('name', name);
    param = param.append('Email', email);
    param = param.append('Address', address);
    param = param.append('User', user);
    param = param.append('Password', password);
    param = param.append('Phone', phone);

    return this.http.get('/api/client', {params: param});
  }
}

