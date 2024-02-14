import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  @ViewChild('product') product: NgForm | any;
  productData: undefined | Product;
  productMessage: undefined | string;
  constructor(
    private route: ActivatedRoute,
    private productSer: ProductService
  ) {}
  ngOnInit(): void {
    let productId: any = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    this.productSer.updateProduct(productId).subscribe((response) => {
      console.log(response);
      this.productData = response;
    });
  }
  updateProduct(data: Product) {
    console.log(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productSer.newUpdateProduct(data).subscribe((response) => {
      if (response) {
        this.productMessage = 'Product edit successfully';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    this.product.reset();
  }
}
