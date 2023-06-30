import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../carrito/product";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-abmProductos',
  templateUrl: './abmProductos.component.html',
  styleUrls: ['./abmProductos.component.css']
})
export class abmProductosComponent {
  products: Product[] = [];
  productName: string | undefined;
  productPrice: string | undefined;
  productImage: string | undefined;


  constructor(protected router: Router, protected httpClient: HttpClient) {
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

  editProduct(productId: number) {

    console.log('Edit product with ID:', productId);
  }

  deleteProduct(productId: number) {
    const url = 'http://localhost:3000/borrarProducto';

    const body = {
      id : productId
    };

    console.log(body)

    this.httpClient.post(url, body).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);

      },
      error => {
        console.error('Error en la solicitud POST:', error);

      }
    );
    //this.products = this.products.filter(product => product.id !== productId);
  }

  addProduct() {
    const url = 'http://localhost:3000/agregarProducto';


    const name = (document.getElementById("nameP") as HTMLInputElement).value;
    console.log(name)
    const price = (document.getElementById("priceP") as HTMLInputElement).value;
    console.log(price)
    const image = (document.getElementById("imageP") as HTMLInputElement).value;
    console.log(image)



    const body = {
      name: name,
      price: price,
      image: image
    };

    console.log(body)

    this.httpClient.post(url, body).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);


      },
      error => {
        console.error('Error en la solicitud POST:', error);

      }
    );

  }




}
