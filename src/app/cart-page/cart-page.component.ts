import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Product, summaryDetails } from '../data-type';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: Cart[] = [];
  cartDataRemove: Product[] | undefined;

  cartDetails: summaryDetails = {
    Total: 0,
    Subtotal: 0,
    Shipping: 0,
  };
  constructor(private product: ProductService, private router: Router) {}
  @ViewChild('form') form: NgForm | any;
  ngOnInit(): void {
    this.loadDetails();
  }

  onSubmit() {
    // console.log('Click');
    // console.log(this.form);
    this.router.navigate(['chackout']);
  }
  loadDetails() {
    this.product.currentCart().subscribe((response) => {
      console.log(response);
      this.cartData = response;
      // this.cartDataRemove = response;
      let totel = 0;
      response.forEach((item) => {
        if (item.quantity) {
          totel = totel + +item.price * item.quantity;
        }
      });
      console.log(totel);
      let tex = 0.18;
      const shippingCharge = 50;
      const gstAmount = totel * tex;
      const totelPrice = totel + gstAmount + shippingCharge;

      this.cartDetails.Subtotal = totel;
      this.cartDetails.Shipping = shippingCharge;
      this.cartDetails.Total = totelPrice;
      console.log(totelPrice);
      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }

  removeItem(id: number) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.log(user);
    this.product.removerFromCartList(id).subscribe((response) => {
      console.log(response);
      this.loadDetails();
      this.product.getCartList(userId);
    });
  }
}
