import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private BASE_URL = 'https://bio-testservice.digital-healthcare.id/api/v1/';

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
