import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, order, summaryDetails } from '../data-type';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chackout-page',
  templateUrl: './chackout-page.component.html',
  styleUrls: ['./chackout-page.component.css'],
})
export class ChackoutPageComponent implements OnInit {
  @ViewChild('order') order?: NgForm;
  cartData: Cart[] | any;
  orderMsg?: string;
  constructor(private product: ProductService, private router: Router) {}
  cartDetails: summaryDetails = {
    Total: 0,
    Subtotal: 0,
    Shipping: 0,
  };
  ngOnInit(): void {
    this.product.currentCart().subscribe((response) => {
      let totel = 0;
      this.cartData = response;
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
    });
  }
  orederNow(data: order) {
    console.warn(data);
    const user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;

    if (this.cartDetails.Total) {
      let orderData: order = {
        ...data,
        totalPrice: this.cartDetails.Total,
        userId,
        id: undefined,
      };

      this.cartData.forEach((item: any) => {
        console.log(item);
        setTimeout(() => {
          this.product.deleteCartItems(item.id);
        }, 1000);
      });
      this.product.orderNow(orderData).subscribe((response) => {
        if (response) {
          // alert(`Product is successfully Ordered`);
          this.orderMsg = 'Product is successfully Ordered';
          this.cartDetails.Total = 0;
          this.order?.reset();
          setTimeout(() => {
            this.router.navigate(['/my-order']);
            this.orderMsg = undefined;
          }, 500);
        }
      });
      console.log(orderData);
    }
  }
}
