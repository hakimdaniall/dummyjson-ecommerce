import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  constructor() { }

  addToCart(product: any) {
    const currentItems = this.cartItemsSubject.getValue();
    const itemExists = currentItems.find(item => item.id === product.id);

    if (itemExists) {
      itemExists.quantity++;
    } else {
      currentItems.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next(currentItems);
    this.calculateTotal(currentItems)
    console.log('curr item is', currentItems)
  }

  reduceItem(product: any) {
    const currentItems = this.cartItemsSubject.getValue();
    const itemIndex = currentItems.findIndex(item => item.id === product.id);

    if (itemIndex >= 0) {
      if (currentItems[itemIndex].quantity > 1) {
        currentItems[itemIndex].quantity--;
      } else {
        currentItems.splice(itemIndex, 1);
      }
      this.cartItemsSubject.next(currentItems);
    }
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getItems() {
    return this.cartItemsSubject.getValue();
  }

  calculateTotal(items: any[]) {
    let total = 0;
    for (let item of items) {
      total += item.price * item.quantity;
    }

    this.totalSubject.next(total);
    return this.totalSubject.getValue();
  }

  removeItem(product: any) {
    const currentItems = this.cartItemsSubject.getValue();
    const itemIndex = currentItems.findIndex(item => item.id === product.id);

    if (itemIndex >= 0) {
      currentItems.splice(itemIndex, 1);
      this.cartItemsSubject.next(currentItems);
    }
  }

}
