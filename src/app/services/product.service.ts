import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product, order } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  cartItems = new EventEmitter<Product[] | []>();
  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/product', data, {
      observe: 'response',
    });
  }
  productList() {
    return this.http.get<Product[]>('http://localhost:3000/product');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }

  updateProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/product/${id}`);
  }
  newUpdateProduct(product: Product) {
    return this.http.put<Product>(
      `http://localhost:3000/product/${product.id}`,
      product
    );
  }
  showImageProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/product?_limit=5`);
  }
  showTrandyProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/product`);
  }
  suggestSearchProduct(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/product?q=${query}`);
  }
  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartItems.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      console.log(cartData);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartItems.emit(cartData);
    }
  }
  removeCartItem(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);

      items = items.filter((item: Product) => productId !== item.id);
      console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartItems.emit(items);
    }
  }
  addToCard(cartData: Cart) {
    return this.http.post('http://localhost:3000/CartData', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<Product[]>('http://localhost:3000/CartData?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((response) => {
        // console.log(response);
        if (response && response.body) {
          this.cartItems.emit(response.body);
        }
      });
  }
  removeToCart(cardId: number) {
    return this.http.delete('http://localhost:3000/CartData/' + cardId);
  }
  currentCart() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(
      `http://localhost:3000/CartData?userId=${userData.id}`
    );
  }
  removerFromCartList(id: number) {
    return this.http.delete(`http://localhost:3000/CartData/${id}`);
  }
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/order', data);
  }
  orderList() {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);

    return this.http.get<order[]>(
      `http://localhost:3000/order?userId=${userData.id}`
    );
  }

  deleteCartItems(cardId: number) {
    return this.http
      .delete('http://localhost:3000/CartData/' + cardId, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response) {
          this.cartItems.emit([]);
        }
      });
  }
  cancelOrder(orderId: number) {
    return this.http.delete(`http://localhost:3000/order/${orderId}`);
  }
}
