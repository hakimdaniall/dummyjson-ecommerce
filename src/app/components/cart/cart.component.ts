import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() items: any[];
  @Input() isOpen: boolean;
  cartsItem: any[] = [];
  total: number = 0;

  constructor(private cartService: AddToCartService) {
    this.cartsItem = this.cartService.getItems();
    this.cartService.total$.subscribe(total => this.total = total);
  }

  ngOnInit() { }

  onClose() {
    this.isOpen = false;
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  reduceItem(item: any) {
    this.cartService.reduceItem(item);
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
  }

}
