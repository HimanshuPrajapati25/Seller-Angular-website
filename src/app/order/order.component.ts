import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  editIcon = faEdit;
  orderData: order[] | undefined;
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.product.cancelOrder(orderId).subscribe((response) => {
        console.log(response)
        this.getOrderList();
      });
  }
  getOrderList() {
    this.product.orderList().subscribe((response) => {
      this.orderData = response;
    });
  }
}
