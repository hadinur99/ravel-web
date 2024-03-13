import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TourService } from 'src/app/_services/tour.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  testimonies: any = [];

  isLoading = true;

  private $ngUnsubscribe = new Subject();

  constructor(
    private tourService: TourService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.tourService
      .getReviews()
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (res) => {
          const { data } = res;
          this.testimonies = data;
          this.isLoading = false;
        },
        error: (err) => {
          const errMsg = err?.error?.message;
          this.isLoading = false;

          // Open error modal
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.errorMessage = errMsg;
        },
      });
  }

  getStars(rating: number): any[] {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(i);
    }
    return stars;
  }
}
