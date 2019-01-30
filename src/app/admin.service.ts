import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  /**
   * function to request for retrieving all userdetails
   * @param id
   */
  getData(id: any): Observable<any> {
    let param = new HttpParams();
    param = param.append('id', id);
    return this.http.get('/api/admin', { params: param });
  }
  /**
   *  function to request for deleting an entry
   * @param id
   */
  delete(id: any): Observable<any> {
    let param = new HttpParams();
    param = param.append('id', id);
    return this.http.get('/api/delete', { params: param, responseType: 'text' });
  }
  /**
   *  function to request for providing admin privilege
   * @param id
   */
  change(id: any): Observable<any> {
    let param = new HttpParams();
    param = param.append('id', id);
    return this.http.get('/api/change', { params: param, responseType: 'text' });
  }

}
