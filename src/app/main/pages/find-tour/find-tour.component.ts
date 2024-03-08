import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TourData } from 'src/app/_helpers/_models/data';
import { Storage } from 'src/app/_helpers/utils';
import { TourService } from 'src/app/_services/tour.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'find-tour',
  templateUrl: './find-tour.component.html',
  styleUrls: ['./find-tour.component.scss'],
})
export class FindTourComponent implements OnInit {
  name!: any;

  isLoading = false;

  toursData!: Array<TourData>;

  searchInput: string = '';

  private $ngUnsubscribe = new Subject();

  constructor(
    private tourService: TourService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.name = Storage.getItem('username');
    this.doSearch('');
  }

  onSearch() {
    this.doSearch(this.searchInput);
  }

  doSearch(key: string) {
    this.isLoading = true;
    this.tourService
      .searchTour(key)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (res) => {
          const { data } = res;
          this.toursData = data;
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
}