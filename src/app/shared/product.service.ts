import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpResponse,  HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class ProductService {
  jwt;
  token;
  constructor(private http: HttpClient, private router: Router) {
  }

  httpClientPost(url, body): Observable<HttpResponse<Info>> {
    return this.http.post<Info>(url, body, {observe: 'response'});
  }

  httpClientPostList(url, body): Observable<HttpResponse<List>> {
    return this.http.post<List>(url, body, {observe: 'response'});
  }
  toLogin(data) {
    this.http.post<Log>('login', {data}, {observe: 'response'}).subscribe(resp => {
      localStorage.setItem('header', resp.body.data);
      return resp.body.data;
    });
    this.router.navigate(['list']);
  }
  toLogout() {
    localStorage.removeItem("header");
  }
  getAccessToken(): string {
    return this.token;
  }
}
interface Log {
  code: number;
  msg: string;
  data: string;
}
interface Info {
  code: number;
  msg: string;
  data: Array<string>;
}
interface List {
  code: number;
  msg: string;
  data: {
    pageIndex: number;
    pageSize: number;
    rows: Array<string>;
    total: number;
  };
}
