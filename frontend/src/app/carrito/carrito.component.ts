import { Component } from '@angular/core';
import { Product } from './product';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  products: Product[] = [];

  constructor() {
    this.products = this.getProducts();
  }

  removeProduct(toDelete: Product) {
    this.products.forEach((element, index) => {
      if (element.id == toDelete.id) this.products.splice(index, 1);
    });
    this.saveLocal();
  }

  total() {
    let total = 0;
    this.products.forEach(product => {
      total += product.price;
    });
    return total;
  }

  addProduct(product: Product) {
    //Si ya esta en el carrito, no lo agrego
    if (this.isProductInCart(product)) {
      return false;
    }

    var carrito_guardado = localStorage.getItem("carrito");
    if (carrito_guardado) {
      this.products = JSON.parse(carrito_guardado);
      this.products.push(product);
    } else {
      this.products = [];
      this.products.push(product);
    }

    this.saveLocal()
    return true;
  }

  getProducts() {
    var carrito_guardado = localStorage.getItem("carrito");
    if (carrito_guardado) { return JSON.parse(carrito_guardado); }
    return null;
  }

  saveLocal() {
    localStorage.setItem('carrito', JSON.stringify(this.products));
  }

  clearCart() {
    this.products = [];
    this.saveLocal();
  }

  count() {
    return this.products.length;
  }

  isProductInCart(needle: Product) {
    var flag = false;
    this.products.forEach((element, index) => {
      if (element.id == needle.id) flag = true;
    });

    return flag;
  }
}
