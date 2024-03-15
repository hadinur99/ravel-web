import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TourData, Data } from 'src/app/_helpers/_models/data';
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

  toursData: Array<TourData> = [];

  private searchSubject = new Subject<string>();
  searchInput: string = '';

  private $ngUnsubscribe = new Subject();

  constructor(
    private tourService: TourService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.name = Storage.getItem('username');
    this.doSearch('');
    this.searchSubject.pipe(debounceTime(500)).subscribe((value) => {
      this.doSearch(value);
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchInput);
  }

  doSearch(key: string) {
    this.isLoading = true;
    this.tourService
      .searchTour(key)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (res) => {
          const { data }: Data = res;
          data.forEach((item: any) => {
            if (item.price) {
              // Create a number formatter for the user's locale
              let formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              });

              // Format the price value
              const formattedPrice = formatter.format(item.price);
              item.price = formattedPrice;
            }
          });
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
