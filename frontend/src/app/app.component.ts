import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '20231erCuatGrupo9';
  public jwt: string | null;

  constructor(protected router: Router, protected httpClient: HttpClient,) {
    this.jwt = localStorage.getItem("jwt");
  }

  getJWT() {
    return this.jwt;
  }
  signOut() {
    const url = 'http://localhost:3000/signOut';
    const body = {
      jwt: this.jwt
    };

    this.httpClient.post<Response>(url, body).subscribe(
      response => {
        console.log('Usuario deslogueado');
      },
      error => {
        console.error('Error al desloguear el usuario');
      }
    );
    localStorage.removeItem("jwt");
    window.location.reload();
  }
}
