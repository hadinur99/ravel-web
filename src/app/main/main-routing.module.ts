import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './main.component';
import { FindTourComponent } from './pages/find-tour/find-tour.component';
import { DetailTourComponent } from './pages/detail-tour/detail-tour.component';
import { ReviewComponent } from './pages/review/review.component';
import { AuthGuard } from '../_helpers/auth-guards';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'pencarian', component: FindTourComponent },
      { path: 'destinasi-wisata/:id', component: DetailTourComponent },
      { path: 'ulasan', component: ReviewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
