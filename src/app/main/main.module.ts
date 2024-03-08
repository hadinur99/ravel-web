import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { FindTourComponent } from './pages/find-tour/find-tour.component';
import { ReviewComponent } from './pages/review/review.component';
import { DetailTourComponent } from './pages/detail-tour/detail-tour.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    FindTourComponent,
    ReviewComponent,
    DetailTourComponent,
    ModalComponent,
  ],
  imports: [CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule],
})
export class MainModule {}
