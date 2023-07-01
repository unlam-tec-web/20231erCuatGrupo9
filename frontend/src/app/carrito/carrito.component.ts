import { Component } from '@angular/core';
import { Product } from './product';
import { RouterTestingHarness } from '@angular/router/testing';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']

})
export class CarritoComponent {
  products: Product[] = [];
  compraExitosa : boolean = false;

  constructor(protected httpClient: HttpClient) {
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

  comprar() {

    var carrito_guardado = localStorage.getItem("carrito");

    let body: any;
    let t = this.total().toString();
    let usuario = "";

    if (carrito_guardado != null) {
      body = {
        usuario: usuario,
        productos: JSON.parse(carrito_guardado),
        total: t
      }
    } else {
      body = {};
    }
    const url = 'http://localhost:3000/comprar';
    this.httpClient.post(url, body).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);
        this.clearCart()
        this.compraExitosa = true;
      },
      error => {
        console.log('Error en la solicitud POST:', error);

      }
    );
  }

  isProductInCart(needle: Product) {
    var flag = false;
    this.products.forEach((element, index) => {
      if (element.id == needle.id) flag = true;
    });

    return flag;
  }
}
