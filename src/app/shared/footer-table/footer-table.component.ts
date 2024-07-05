import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer-table.component.html',
  styleUrl: './footer-table.component.scss'
})
export class FooterTableComponent {

  @Input()
  totalRecords = 0;

  @Output()
  eventAmount = new EventEmitter<number>();

  @Output()
  eventNext = new EventEmitter<number>();

  @Output()
  eventPrevious = new EventEmitter<number>();

  amountToShow = '5';


  emitAmount(): void {
    this.eventAmount.emit(+this.amountToShow)
  }

  next(): void {
    this.eventNext.emit(+this.amountToShow);
  }

  previous(): void {
    this.eventPrevious.emit(+this.amountToShow);
  }

}

