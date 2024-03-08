import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private BASE_URL = environment.url;

  constructor(private http: HttpClient) {}

  searchTour(key: string): Observable<any> {
    let loadUrl = this.BASE_URL + 'tours?search=' + key;
    return this.http.get(loadUrl);
  }

  getReviews(): Observable<any> {
    let loadUrl = this.BASE_URL + 'testimonies';
    return this.http.get(loadUrl);
  }

  getDetailTour(id: any): Observable<any> {
    let loadUrl = this.BASE_URL + 'tours/' + id;
    return this.http.get(loadUrl);
  }
}
