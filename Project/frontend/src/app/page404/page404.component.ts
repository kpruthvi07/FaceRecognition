import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("We are sorry, Page not found!");
  }

  ngOnInit() {
    window.scroll(0, 0);
    // (document.getElementById("search-bar-span") as HTMLElement).style.display = "block";
  }

}
