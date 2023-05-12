import { Component } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'product1',
      details: 'productDetail1',
      price: 45.6
    },
    {
      id: 2,
      name: 'product2',
      details: 'productDetail2tail2 productDetail2 productDetail2 ',
      price: 2689
    },
    {
      id: 3,
      name: 'product3',
      details: 'productDetail3',
      price: 30
    }
  ];

  constructor() { }

  removeElement(id: Product) {
    delete this.products[this.products.indexOf(id, 0)]
  }

  total() {
    let total = 0;
    this.products.forEach(product => {
      total += product.price;
    });
    return total;
  }
}
