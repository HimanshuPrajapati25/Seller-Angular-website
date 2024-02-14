import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productData: any | Product[];
  popularProduct: undefined | Product[];
  trandyProduct: undefined | Product[];
  removeCart = false;
  activedRoute: any;
  product: any;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.showImageProduct().subscribe((response) => {
      // console.warn(response);
      this.popularProduct = response;
    });
    this.productService.showTrandyProduct().subscribe((response) => {
      this.trandyProduct = response;

      console.log(response);
    });
  }
  addToCart() {
    let productId = this.activedRoute.snapshot.paramMap.get('id');
    console.log(productId);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.log(userId);
    // const cartData: Cart | any = {
    //   ...this.productData,
    //   productId: this.productData?.id,
    //   userId,
    // };
    // delete cartData.id;
    // console.log(cartData);
  }
}
