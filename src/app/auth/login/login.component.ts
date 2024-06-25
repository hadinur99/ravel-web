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
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isLoading = false;
  errorMessage = '';

  showToast = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  $unSubscribe = new Subject();

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    const payload = this.loginForm.value;
    this.authService
      .login(payload)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe({
        next: (res) => {
          const { name, accessToken } = res?.data;
          this.authService.storeUserData(name, accessToken);
          this.isLoading = false;
          this.showToast = true;
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          const errMsg = err?.error?.message;
          this.errorMessage = errMsg;
          this.isLoading = false;
          this.showToast = true;
        },
      });
  }
}
