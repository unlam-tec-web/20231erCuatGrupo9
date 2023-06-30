import { Component } from '@angular/core';
import { Product } from "../carrito/product";
import { CarritoComponent } from '../carrito/carrito.component';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {

  products: Product[] = [];

  carrito: any ;

  constructor(protected router: Router, protected httpClient: HttpClient) {
    this.carrito  = new CarritoComponent(httpClient);
    let res: Observable<Product[]> =
      this.httpClient.get<Product[]>('http://localhost:3000/galeria');

    res.subscribe(
      value => {
        console.log(value);
        this.products = value;
      },
      error => {
        console.log('ocurrio un error');
      });

  }
}
