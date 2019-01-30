import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  /**
   * function to issue request to the server for user credential validation
   * @param username
   * @param password
   */
  login(username: string, password: string): Observable<any> {
    let param = new HttpParams();
    param = param.append('username', username);
    param = param.append('password', password);
    return this.http.get('/api/login', { params: param });
  }
}

