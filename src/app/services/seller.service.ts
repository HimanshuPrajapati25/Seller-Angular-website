import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  validationErrors: any;
  constructor(private http: HttpClient, private router: Router) {}
  isSellerLoggerdIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  userSignUp(data: SignUp) {
    console.log(data);
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        console.log(result);
        this.isSellerLoggerdIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }
  //Reload function
  reloadSeller() {
    const sellerData = localStorage.getItem('seller');
    if (sellerData) {
      this.isSellerLoggerdIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  //Login
  userLogin(data: Login) {
    console.log(data);
    //api call code will be there
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length) {
          console.warn('Seller login');
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.warn('Login fail');
          this.isLoginError.emit(true);
        }
      });
  }
}
