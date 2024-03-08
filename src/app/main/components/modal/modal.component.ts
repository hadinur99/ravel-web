import { Component, Input, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from 'src/app/_helpers/utils';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // activeModal = inject(NgbActiveModal);
  @Input() errorMessage!: string;

  constructor(private router: Router, private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  logout() {
    this.activeModal.dismiss();
    Storage.removeItem('username');
    Storage.removeItem('Bearer');
    this.router.navigateByUrl('/auth/login');
  }
}
