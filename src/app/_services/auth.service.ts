import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login, Register } from '../_helpers/_models/data';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = environment.url;

  constructor(private router: Router, private http: HttpClient) {}

  storeUserData(name: string, accessToken: string) {
    const username = JSON.stringify(name);
    const token = JSON.stringify(accessToken);
    localStorage.setItem('username', username);
    localStorage.setItem('Bearer', token);
  }

  login(payload: Login): Observable<any> {
    let loadUrl = this.BASE_URL + 'auam/login';
    return this.http.post(loadUrl, payload);
  }

  register(payload: Register): Observable<any> {
    let loadUrl = this.BASE_URL + 'auam/register';
    return this.http.post(loadUrl, payload);
  }
}
