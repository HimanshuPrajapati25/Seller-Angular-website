import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product, order } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  quantity: number = 1;
  removeCarts = false;
  cartDataRemove: Product | undefined;
  constructor(
    private activedRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productId = this.activedRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId &&
      this.product.updateProduct(productId).subscribe((response) => {
        // console.log(response);
        this.productData = response;
      });
    let cartData = localStorage.getItem('localCart');
    if (cartData && productId) {
      let items = JSON.parse(cartData);
      // console.log(items);
      items = items.filter((item: Product) => productId === item.id.toString());
      if (items.length) {
        this.removeCarts = true;
      } else {
        this.removeCarts = false;
      }
    }
    let user = localStorage.getItem('user');
    // console.log(user);
    if (user) {
      let userId = user && JSON.parse(user).id;
      console.log(userId);
      this.product.getCartList(userId);
      this.product.cartItems.subscribe((response) => {
        let item = response.filter(
          (item: Product) =>
            productId?.toString() === item.productId?.toString()
        );
        if (item.length) {
          this.cartDataRemove = item[0];

          this.removeCarts = true;
        }
      });
    }
  }
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < 20) {
      this.quantity++;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.quantity;
      console.log(this.productData);
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCarts = true;
      } else {
        console.log('user Is loggged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        const cartData: Cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        // console.log(cartData);
        this.product.addToCard(cartData).subscribe((response) => {
          if (response) {
            // alert('Product is added in a cart');
            this.product.getCartList(userId);
            this.removeCarts = true;
          }
        });
      }
    }
  }
  removeCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeCartItem(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartDataRemove &&
        this.product
          .removeToCart(this.cartDataRemove.id)
          .subscribe((response) => {
            console.log(response);
            if (response) {
              this.product.getCartList(userId);
            }
          });
      this.removeCarts = false;
      console.log(this.cartDataRemove);
    }
  }
}
