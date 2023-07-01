import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(protected router: Router, protected httpClient: HttpClient, app: AppComponent) {
    if (app.jwt != null) { this.router.navigate(['/home']); }
  }


  login() {
    const url = 'http://localhost:3000/login';

    const mail = (document.getElementById("mail") as HTMLInputElement).value;
    console.log(mail)
    const password = (document.getElementById("password") as HTMLInputElement).value;
    console.log(password)

    const body = {
      mail: mail,
      password: password
    };

    console.log(body);


    this.httpClient.post<Response>(url, body).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);
        localStorage.setItem('jwt', response.result.idToken.jwtToken);
        if (response.result.idToken.payload['cognito:groups'] !== undefined) {
          localStorage.setItem('rol', response.result.idToken.payload['cognito:groups'][0]);
        }
        window.location.reload();
      },
      error => {
        console.error('Error en la solicitud POST:', error);

      }
    );

  }
}

export interface Response {
  result: {
    idToken: {
      jwtToken: string,
      payload: {
        sub: string,
        "cognito:groups": [string]
        email_verified: boolean,
        iss: string,
        "cognito:username": string,
        given_name: string,
        origin_jti: string,
        aud: string,
        event_id: string,
        token_use: string,
        auth_time: BigInteger,
        exp: BigInteger,
        iat: BigInteger,
        jti: string,
        email: string
      }
    },
    refreshToken: {
      token: string
    },
    accessToken: {
      jwtToken: string,
      payload: {
        sub: string,
        iss: string,
        client_id: string,
        scope: string,
        origin_jti: string,
        aud: string,
        event_id: string,
        token_use: string,
        auth_time: BigInteger,
        exp: BigInteger,
        iat: BigInteger,
        jti: string,
        username: string
      }
    },
    clockDrift: BigInteger
  }
}
