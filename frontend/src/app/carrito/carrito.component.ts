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
      name: 'Dishonored',
      details: 'Accion',
      price: 45.6
    },
    {
      id: 2,
      name: 'Prey',
      details: 'Misterio',
      price: 2689
    },
    {
      id: 3,
      name: 'Battlefield 1',
      details: 'Shooter',
      price: 2689
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
