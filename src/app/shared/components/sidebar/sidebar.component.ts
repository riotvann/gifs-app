import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  tagsHistory: string[] = []
  constructor(private gifsService: GifsService) {
    // this.tagsHistory = this.gifsService.tagsHistory;
  }

  get tags() {
    return this.gifsService.tagsHistory;
  }

  searchAgain(tag: string) {
    console.log('click wea');
    console.log(tag);
    this.gifsService.searchTag(tag);
  }
}
