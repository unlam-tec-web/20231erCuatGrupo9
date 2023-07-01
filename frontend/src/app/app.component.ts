import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '20231erCuatGrupo9';
  public jwt: string|null;

  constructor() {
    this.jwt = localStorage.getItem("jwt");
  }

  getJWT(){
    return this.jwt;
  }
}
