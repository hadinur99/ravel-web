import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const bearerToken = localStorage.getItem('Bearer');
    if (bearerToken) {
      // If 'Bearer' item exists in localStorage, allow navigation
      return true;
    } else {
      // If 'Bearer' item does not exist in localStorage, redirect to login page
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
