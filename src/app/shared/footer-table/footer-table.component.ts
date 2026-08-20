import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer-table.component.html',
  styleUrl: './footer-table.component.scss'
})
export class FooterTableComponent {

  totalRecords = input(0);

  eventAmount = output<number>();

  eventNext = output<number>();

  eventPrevious = output<number>();

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

