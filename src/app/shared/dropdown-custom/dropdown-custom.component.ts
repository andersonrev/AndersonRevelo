import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-custom',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-custom.component.html',
  styleUrl: './dropdown-custom.component.scss'
})
export class DropdownCustomComponent {

  @Input()
  items: { label: string, command: (data: any) => void }[] = []

  @Input()
  data: any;

  emitEvent(index: number) {
    this.items[index].command(this.data);
  }

  showOptions(){
  }

}
