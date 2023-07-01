import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '20231erCuatGrupo9';
  public jwt: string|null;

  constructor(protected router: Router) {
    this.jwt = localStorage.getItem("jwt");
  }

  getJWT(){
    return this.jwt;
  }
  signOut(){
    localStorage.removeItem("jwt");
    window.location.reload();
  }
}
