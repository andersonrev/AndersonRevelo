import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCustomComponent } from './dropdown-custom.component';

describe('DropdownCustomComponent', () => {
  let component: DropdownCustomComponent;
  let fixture: ComponentFixture<DropdownCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownCustomComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute function command of amount data to show', () => {

    const mockSelect: any = [{
      label: '5',
      command: (data: any) => {
        return 5;
      }
    }];

    const data = 5;

    component.items = mockSelect;

    const f = spyOn(component.items[0], 'command');

    component.emitEvent(0);
    expect(f).toHaveBeenCalled();

  });
});
