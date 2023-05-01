import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddToCartService } from 'src/app/services/add-to-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
  data;
  currentImage;
  currentIndex: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cartService: AddToCartService
  ) {
    this.route.params.subscribe(params => this.productId = params.id);
  }

  ngOnInit(): void {
    this.getItem(this.productId)
  }

  getItem(productId) {
    this.http.get(`https://dummyjson.com/products/${productId}`).subscribe(data => {
      this.data = data;
    })
  }

  decreaseQuantity(input: HTMLInputElement) {
    let value = parseInt(input.value);
    if (value > 0) {
      input.value = (value - 1).toString();
    }
  }

  increaseQuantity(input: HTMLInputElement) {
    let value = parseInt(input.value);
    input.value = (value + 1).toString();
  }

  onNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.data.images.length) {
      this.currentIndex = 0;
    }
    this.currentImage = this.data.images[this.currentIndex];
  }

  updateCurrentImage(image: string) {
    this.currentIndex = this.data.images.indexOf(image);
    this.currentImage = image;
  }

  addToCart(item) {
    this.cartService.addToCart(item);
  }

}
