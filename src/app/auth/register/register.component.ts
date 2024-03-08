import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

  errorMessage = '';

  private $ngUnsubscribe = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      userId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    const payload = this.registerForm.value;
    this.authService
      .register(payload)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          const { status } = res;
          this.router.navigateByUrl('auth/login');
        },
        error: (err) => {
          const errMsg = err?.error?.message;
          this.errorMessage = errMsg;
          this.isLoading = false;
        },
      });
  }
}
