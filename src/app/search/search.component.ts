import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | Product[];
  notFound: string | any;
  constructor(
    private activaRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let query = this.activaRoute.snapshot.paramMap.get('query');
    console.log(query);
    query &&
      this.product.suggestSearchProduct(query).subscribe((response) => {
        console.log(response);
        this.searchResult = response;
        // if (response.length === 0) {
        //   this.notFound = 'Not Found Result';
        //   console.log(this.notFound);
        // }
      });
  }
}
