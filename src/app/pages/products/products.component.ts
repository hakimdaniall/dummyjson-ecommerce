import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartService } from 'src/app/services/add-to-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products;
  paginatedProducts;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  searchQuery: string;
  filteredProducts: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: AddToCartService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get('https://dummyjson.com/products').subscribe((data: any) => {
      this.products = data.products;
      this.filteredProducts = this.products;
      this.paginateProducts();
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    });
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedProducts = this.filteredProducts.slice(
        startIndex,
        endIndex
      );
    }
  }

  updateSearchQuery(event: any) {
    this.searchQuery = event.target.value;
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter((product) => {
        const searchValue = this.searchQuery.toLowerCase();
        const title = product.title.toLowerCase();
        return title.includes(searchValue);
      });
    } else {
      this.clearSearch();
    }
  }

  onSearch() {
    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    );
    this.paginateProducts();
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredProducts = this.products;
    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    );
    this.paginateProducts();
  }

  goToProductDetails(id) {
    this.router.navigate(['product-details/' + id])
  }

  addToCart(item) {
    this.cartService.addToCart(item);
  }
}
