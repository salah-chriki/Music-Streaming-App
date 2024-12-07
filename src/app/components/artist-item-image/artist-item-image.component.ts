import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-artist-item-image',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './artist-item-image.component.html',
  styleUrl: './artist-item-image.component.scss'
})
export class ArtistItemImageComponent implements OnInit{
  @Input()
  imageSrc = '';

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }
}
