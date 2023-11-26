import { Component, OnInit } from '@angular/core';
import { LoginPresenter } from './login.presenter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/presentation/shared/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginPresenter]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    public presenter: LoginPresenter,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      code: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.presenter.authUser(
      this.loginForm.get('code')?.value,
      this.loginForm.get('password')?.value);
  }

  onInput(ev: any) {
    const value = ev.target!.value;
    const filteredValue = this.validator.isAlphanumericValue(value);
    this.loginForm.patchValue({ code: filteredValue });
  }
}
