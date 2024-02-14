import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  isToggle: boolean = false;
  authError: string = '';
  constructor(private seller: SellerService, private router: Router) {}
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  onSingUp(data: SignUp): void {
    // console.log(data);
    this.seller.userSignUp(data);
  }
  onLogin(data: SignUp): void {
    this.authError = '';
    // console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((response) => {
      if (response) {
        this.authError = 'Email or password is not correct';
      }
    });
  }
  opanLogin() {
    this.isToggle = true;
  }
  openSignup() {
    this.isToggle = false;
  }
}
