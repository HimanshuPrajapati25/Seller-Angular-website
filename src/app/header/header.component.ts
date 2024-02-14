import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { style } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'Default';
  sellerName: string = '';
  userName: string = '';
  cartItem: number = 0;
  searchResult: undefined | Product[];
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((response: any) => {
      // console.log(response);
      if (response.url) {
        if (localStorage.getItem('seller') && response.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            console.log(sellerData);
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');

          let userData = userStore && JSON.parse(userStore);

          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this.productService.cartItems.subscribe((response) => {
      this.cartItem = response.length;
    });
  }
  onLogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  onInputChange(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.productService
        .suggestSearchProduct(element.value)
        .subscribe((response) => {
          // console.log(response);
          this.searchResult = response;
          // if result is greatter then 5
          if (response.length > 5) {
            response.length = 5;
          }
        });
    }
  }
  // hide search bar
  hideSearch() {
    this.searchResult = undefined;
  }

  //search input
  submitSearch(value: string) {
    // console.warn(value);
    // navigate with query
    this.router.navigate([`search/${value}`]);
  }
  redirectToDetails(data: any) {
    this.router.navigate([`/details/${data}`]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['user-auth']);
    this.productService.cartItems.emit([]);
  }
  onAlert() {
    if (this.cartItem === 0) {
      alert('add item in cart');
      console.log('addd can ');
    }
  }
}
