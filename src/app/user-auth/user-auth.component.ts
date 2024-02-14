import { Component, OnInit, ViewChild } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  @ViewChild('userLogin') userLogin: NgForm | any;
  isToggle = false;
  error!: string;
  constructor(
    private userService: UserService,
    private productSer: ProductService
  ) {}

  ngOnInit(): void {
    this.userService.reloadUser();
    // console.log(this.userService);
  }

  onSingUp(data: SignUp) {
    // console.log(data);
    this.userService.userSingup(data);
  }
  onLogin(data: Login) {
    this.error = '';
    this.userService.userLogin(data);
    this.userService.useError.subscribe((response) => {
      if (response) {
        this.error = 'email and password is wrong';
      } else {
        this.localCartToRemoteCart();
      }
    });
    // this.userLogin.reset();
  }

  openLogin() {
    this.isToggle = false;
  }
  openSignup() {
    this.isToggle = true;
  }

  localCartToRemoteCart() {
    // debugger;
    const data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.log(userId);
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      console.log('CartDataList', cartDataList);
      console.log(userId);
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        // console.log(cartData);
        setTimeout(() => {
          this.productSer.addToCard(cartData).subscribe((response) => {
            if (response) {
              console.log('item stored in DB');
            }
            if (cartDataList.length === index + 1) {
              localStorage.removeItem('localCart');
            }
          });
        }, 500);
      });
    }
    setTimeout(() => {
      this.productSer.getCartList(userId);
    }, 1000);
  }
}
