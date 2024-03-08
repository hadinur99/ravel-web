import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login, Register } from '../_helpers/_models/data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'https://bio-testservice.digital-healthcare.id/api/v1/';

  constructor(private router: Router, private http: HttpClient) {}

  login(payload: Login): Observable<any> {
    let loadUrl = this.BASE_URL + 'auam/login';
    return this.http.post(loadUrl, payload);
  }

  register(payload: Register): Observable<any> {
    let loadUrl = this.BASE_URL + 'auam/register';
    return this.http.post(loadUrl, payload);
  }
}
