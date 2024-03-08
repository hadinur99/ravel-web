import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
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

  storeUserData(name: string, accessToken: string) {
    const username = JSON.stringify(name);
    const token = JSON.stringify(accessToken);
    localStorage.setItem('username', username);
    localStorage.setItem('Bearer', token);
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
          this.storeUserData(name, accessToken);
          this.isLoading = false;
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          const errMsg = err?.error?.message;
          this.errorMessage = errMsg;
          this.isLoading = false;
        },
      });
  }
}
