import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor() {}

  image_name: string | undefined;
  number_of_images = 29;

  ngOnInit(): void {
    this.setBackgroundImage();
  }

  setBackgroundImage() {
    let current_date = Date.now();

    let mod = current_date % this.number_of_images;
    mod++;

    this.image_name = `background_${mod}.jpg`;
  }
}
