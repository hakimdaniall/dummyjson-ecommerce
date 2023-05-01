import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  isOpen = false;
  cartQuantity: number = 0;

  constructor(private cartService: AddToCartService) {
    this.cartService.cartQuantity$.subscribe(quantity => {
      this.cartQuantity = quantity;
    });
  }

  ngOnInit(): void {
  }
}
