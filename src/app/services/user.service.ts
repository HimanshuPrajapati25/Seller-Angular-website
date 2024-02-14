import { EventEmitter, Injectable } from '@angular/core';
import { Login, Product, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  useError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSingup(data: SignUp) {
    this.http
      .post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((response) => {
        // console.log(response);
        if (response) {
          localStorage.setItem('user', JSON.stringify(response.body));
          this.router.navigate(['/']);
        }
      });
  }
  reloadUser() {
    const sellerData = localStorage.getItem('user');
    if (sellerData) {
      this.router.navigate(['/']);
    }
  }

  userLogin(data: Login) {
    // debugger;
    return this.http
      .get<SignUp[]>(
        `http://localhost:3000/user?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response && response.body?.length) {
          console.log('user login');
          localStorage.setItem('user', JSON.stringify(response.body[0]));
          // console.log(response.body[0]);
          this.router.navigate(['/']);
          this.useError.emit(false);
        } else {
          this.useError.emit(true);
          console.log('user login failed');
        }
      });
  }
}
