import { Component } from '@angular/core';
import {Product} from "../carrito/product";
import { CarritoComponent } from '../carrito/carrito.component';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {

  products: Product[] = [
    {
      id: 1,
      name: 'Dishonored 2',
      image: 'assets/img/dishonored.jpg',
      price: 45.6,
      details:'Dishonored 2 de Bethesda'
    },
    {
      id: 2,
      name: 'Prey',
      image: 'assets/img/prey.jpg',
      price: 2689,
      details:'Prey de Bethesda'
    },
    {
      id: 3,
      name: 'Battlefield 1',
      image: 'assets/img/battlefield1.jpg',
      price: 2689,
      details:'Battlefield de EA'
    },
    {
      id: 4,
      name: 'Doom',
      image: 'assets/img/doom.jpg',
      price: 2689,
      details:'Doom de Bethesda'
    },
    {
      id: 5,
      name: 'Far Cry',
      image: 'assets/img/farcry.jpg',
      price: 2689,
      details:'Far Cry de Ubisoft'
    },
    {
      id: 6,
      name: 'Hitman',
      image: 'assets/img/hitman.jpg',
      price: 2689,
      details:'Hitman de Eidos'
    },
    {
      id: 7,
      name: 'Horizon - Forbidden west',
      image: 'assets/img/horizon.jpg',
      price: 2689,
      details:'Horizon - Forbidden west de Guerrilla'
    },
    {
      id: 8,
      name: 'The Medium',
      image: 'assets/img/medium.jpg',
      price: 30,
      details:'The Medium de Bloober'
    }
  ];
  
  carrito: CarritoComponent = new CarritoComponent;

  constructor() { }
}
