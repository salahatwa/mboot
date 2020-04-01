import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
// import {Http, ResponseContentType} from '@angular/http';
import { Observable ,  throwError } from 'rxjs';

import { JwtService } from '../../auth/jwt.service';
import { catchError } from 'rxjs/operators';
import { Pageable } from './../../../../shared/shared-components/paging-lib/pageable';
import { Page } from './../../../../shared/shared-components/paging-lib/page';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  private formatErrors(error: any) {
    console.log(error);
    return  throwError(error.error);
  }

  public  getPage(path: string,pageable: Pageable) : Observable<Page<any>> {
    return this.http.get<Page<any>>(`${environment.api_url}${path}`+ '?page=' + pageable.pageNumber
    + '&size=' + pageable.pageSize).pipe(catchError(this.formatErrors));
  }
  
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

   getFile(path: string): Observable<ArrayBuffer>{		
		return this.http.get(`${environment.api_url}${path}`, {
      responseType: 'arraybuffer'});
   }

   postGetFile(path: string, body: Object = {}): Observable<ArrayBuffer>{		
		return this.http.post(`${environment.api_url}${path}`,body, {
      responseType: 'arraybuffer'});
   }

   openFile(path: string, body: Object = {}): Observable<Blob>{		
		return this.http.post(`${environment.api_url}${path}`,  JSON.stringify(body), {
      responseType: 'blob'});
   }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    console.log(body);
    return this.http.post(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
