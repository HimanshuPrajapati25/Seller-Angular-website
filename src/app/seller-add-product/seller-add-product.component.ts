import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  @ViewChild('addProduct') addProduct: NgForm | any;
  addText: string | undefined;
  constructor(private product: ProductService) {}
  ngOnInit(): void {}
  sallerAddProduct(data: Product) {
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addText = 'Product add successfully.';
        setTimeout(() => (this.addText = undefined), 3000);
      }
    });
    this.addProduct.reset();
  }
}
