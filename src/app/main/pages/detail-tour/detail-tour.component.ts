import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TourData } from 'src/app/_helpers/_models/data';
import { TourService } from 'src/app/_services/tour.service';

@Component({
  selector: 'detail-tour',
  templateUrl: './detail-tour.component.html',
  styleUrls: ['./detail-tour.component.scss'],
})
export class DetailTourComponent implements OnInit {
  id!: any;

  data!: TourData;
  isLoading = true;

  $unSubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tourService
      .getDetailTour(this.id)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.data = res.data;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }
}
