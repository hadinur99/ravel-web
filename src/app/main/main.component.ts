import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../_helpers/utils';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  username: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = Storage.getItem('username');
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout() {
    Storage.removeItem('username');
    Storage.removeItem('Bearer');
    this.router.navigateByUrl('/auth/login');
  }
}
