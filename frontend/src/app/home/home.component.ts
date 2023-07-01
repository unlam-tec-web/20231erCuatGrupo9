import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  /*template: `
    <div class="w3-content w3-display-container">
      <ng-container *ngFor="let image of images">
        <img src="{{image}}" class="mySlides w3-animate-opacity">
      </ng-container>
      <button class="w3-button w3-black w3-display-left" (click)="plusSlides(-1)">&#10094;</button>
      <button class="w3-button w3-black w3-display-right" (click)="plusSlides(1)">&#10095;</button>
      <div class="w3-center w3-container w3-section w3-light-grey">
        <ng-container *ngFor="let image of images; let i = index">
          <span class="w3-badge demo w3-border w3-transparent w3-hover-white" (click)="currentSlide(i+1)"></span>
        </ng-container>
      </div>
    </div>
  `,*/
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(protected router: Router){}

  images = [
    'assets/img/doom.jpg',
    'assets/img/doom.jpg',
    'assets/img/doom.jpg',
  ];

  // Cambia la diapositiva actual al hacer clic en los puntos de la lista de miniaturas
  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  // Avanza/retrocede el carrusel haciendo clic en las flechas laterales
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  // Muestra las diapositivas del carrusel
  showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      (dots[i] as HTMLElement).className = (dots[i] as HTMLElement).className.replace(" w3-white", "");
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = "block";
    (dots[this.slideIndex - 1] as HTMLElement).className += " w3-white";
  }

  slideIndex = 1;
  ngOnInit() {
    this.showSlides(this.slideIndex);
  }
}
