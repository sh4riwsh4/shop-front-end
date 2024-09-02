import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  templateUrl : './star-rating.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  styleUrls : ['star-rating.component.css']
})

export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: boolean[] = Array(5).fill(false);

  rate(rating: number) {
    if (!this.readonly) {
      this.rating = rating;
      this.ratingChange.emit(this.rating);
    }
  }

  getStarClass(index: number): string {
    if (this.rating >= index + 1) {
      return 'fa-solid fa-star';
    } else if (this.rating >= index + 0.5) {
      return 'fa-solid fa-star-half';
    } else {
      return 'fa fa-star-o';
    }
  }
}
