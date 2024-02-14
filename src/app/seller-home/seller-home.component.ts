import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: Product[] = [];
  icon = faTrash;
  editIcon =faEdit
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.fetchItem();
  }
  fetchItem() {
    this.product.productList().subscribe((result) => {
      console.log(result);
      this.productList = result;
    });
  }
  onDelete(index: number) {
    this.product.deleteProduct(index).subscribe((response) => {
      if (response) {
        alert('do you want to delete this product');
        this.fetchItem();
      }
    });
  }
}
