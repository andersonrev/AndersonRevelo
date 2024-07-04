import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown-custom',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-custom.component.html',
  styleUrl: './dropdown-custom.component.scss'
})
export class DropdownCustomComponent {

  @ViewChild('dropdownContent') dropdownContent!: TemplateRef<any>;

  @Input()
  items: { label: string, command: (data: any) => void }[] = []

  @Input()
  data: any;


  constructor(){}


  emitEvent(index: number) {
    this.items[index].command(this.data);
  }

}
