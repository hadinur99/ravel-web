import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTourComponent } from './find-tour.component';

describe('FindTourComponent', () => {
  let component: FindTourComponent;
  let fixture: ComponentFixture<FindTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
