import { Component } from '@angular/core';
import {Product} from "../carrito/product";

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {

  products: Product[] = [
    {
      id: 1,
      name: 'Dishonored',
      details: 'assets/img/dishonored.jpg',
      price: 45.6
    },
    {
      id: 2,
      name: 'Prey',
      details: 'assets/img/prey.jpg',
      price: 2689
    },
    {
      id: 3,
      name: 'Battlefield 1',
      details: 'assets/img/battlefield1.jpg',
      price: 2689
    },
    {
      id: 4,
      name: 'Doom',
      details: 'assets/img/doom.jpg',
      price: 2689
    },
    {
      id: 5,
      name: 'Far Cry ',
      details: 'assets/img/farcry.jpg',
      price: 2689
    },
    {
      id: 6,
      name: 'Hitman',
      details: 'assets/img/hitman.jpg',
      price: 2689
    },
    {
      id: 7,
      name: 'Horizon',
      details: 'assets/img/horizon.jpg',
      price: 2689
    },
    {
      id: 8,
      name: 'Medium',
      details: 'assets/img/medium.jpg',
      price: 30
    }
  ];

  constructor() { }
}

/*
* <div class="gallery-item">
      <img src="assets/img/dishonored.jpg" alt="Foto 2">
      <div class="gallery-item-caption">
        <h3>Dishonored 2</h3>
      </div>
    </div>
    <div class="gallery-item">
      <img src="assets/img/prey.jpg" alt="Foto 3">
      <div class="gallery-item-caption">
        <h3>Prey</h3>
      </div>
    </div>
    <div class="gallery-item">
      <img src="assets/img/battlefield1.jpg" alt="Foto 3">
      <div class="gallery-item-caption">
        <h3>Battlefield 1</h3>
      </div>
    </div>
    <div class="gallery-item">
      <img src="assets/img/doom.jpg" alt="Foto 3">
      <div class="gallery-item-caption">
        <h3>Doom</h3>
      </div>
    </div>
    <div class="gallery-item">
      <img src="assets/img/farcry.jpg" alt="Foto 3">
      <div class="gallery-item-caption">
        <h3>Far Cry 3</h3>
      </div>
    </div>
    <div class="gallery-item">
      <img src="assets/img/hitman.jpg" alt="Foto 3">
      <div class="gallery-item-caption">
        <h3>Hitman</h3>
      </div>
    </div>
    <div class="gallery-item">
      <img src="assets/img/horizon.jpg" alt="Foto 3">
      <div class="gallery-item-caption">
        <h3>Horizon</h3>
      </div>
    </div>
    <div class="gallery-item">
      <img src="assets/img/medium.jpg" alt="Foto 3">
      <div class="gallery-item-caption">
        <h3>Medium</h3>
      </div>
    </div>
* */
