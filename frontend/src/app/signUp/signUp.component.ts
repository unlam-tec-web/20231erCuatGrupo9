import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent {

  verify : boolean  = false;


  constructor(protected router: Router, protected httpClient: HttpClient){ }

  registrarse(){
    const url = 'http://localhost:3000/signup';


    const name = (document.getElementById("nombre") as HTMLInputElement).value;
    console.log(name)
    const contraseña = (document.getElementById("contraseña") as HTMLInputElement).value;
    console.log(contraseña)
    const email = (document.getElementById("email") as HTMLInputElement).value;
    console.log(email)
    const domicilio = (document.getElementById("domicilio") as HTMLInputElement).value;
    console.log(domicilio)
    const fechaNac = (document.getElementById("fechaNacimiento") as HTMLInputElement).value;
    console.log(fechaNac)



    const body = {
      name: name,
      password: contraseña,
      mail: email,
      domicilio: domicilio,
      fechaNac: fechaNac
    };

    console.log(body)

    this.httpClient.post(url, body).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);
        this.verify = true;

      },
      error => {
        console.log('Error en la solicitud POST')
        console.log('Error en la solicitud POST:', error);
        console.log(error.error.code);
        if(error.error.code=='UsernameExistsException'){
          this.verify=true;
        }


      }
    );
  }

  verifyCode(){
    const url = 'http://localhost:3000/verify';

    const email = (document.getElementById("email") as HTMLInputElement).value;
    console.log(email)
    const codigo = (document.getElementById("codigo") as HTMLInputElement).value;
    console.log(codigo)

    const body = {
      mail : email,
      code : codigo
    };

    console.log(body)

    this.httpClient.post(url, body).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);
        this.verify = true;
        this.router.navigate(['/galeria']);
      },
      error => {
        console.error('Error en la solicitud POST:', error);

      }
    );
  }
}
