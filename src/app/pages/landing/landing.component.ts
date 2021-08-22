import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';
import { fadeAnimation } from 'src/app/styles/animations/fade.animation';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [fadeAnimation],
})
export class LandingComponent implements OnInit {
  constructor(private githubService: GithubService) {}

  image_name: string | undefined;
  number_of_images = 29;
  tag_name: string = '';
  download_url: string = '';

  file_ready: boolean = false;

  ngOnInit(): void {
    this.setBackgroundImage();
    this.getRelease();
  }

  setBackgroundImage() {
    let current_date = Date.now();

    let mod = current_date % this.number_of_images;
    mod++;

    this.image_name = `background_${mod}.jpg`;
  }

  async getRelease() {
    let releases = (await this.githubService
      .getReleases()
      .toPromise()) as Array<any>;
    let latest_release = releases[0];

    let assets = latest_release['assets'];

    let asset = this.search('Valoline.exe', assets);
    this.download_url = asset.browser_download_url;
    this.tag_name = latest_release['tag_name'];

    setTimeout(() => {
      this.file_ready = true;
    }, 1500);
  }

  search(nameKey: any, myArray: any) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }

  downloadFile(link: string) {
    window.location.href = link;
  }
}
