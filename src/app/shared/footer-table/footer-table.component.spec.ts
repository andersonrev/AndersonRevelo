import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTableComponent } from './footer-table.component';

describe('FooterTableComponent', () => {
  let component: FooterTableComponent;
  let fixture: ComponentFixture<FooterTableComponent>;

  let amount = 5;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    amount = +component.amountToShow;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit eventAmount with amountToShow as number', () => {
    spyOn(component.eventAmount, 'emit');

    component.emitAmount();

    expect(component.eventAmount.emit).toHaveBeenCalledWith(amount);
  });

  it('should emit eventNext with amountToShow as number', () => {
    spyOn(component.eventNext, 'emit');


    component.next();

    expect(component.eventNext.emit).toHaveBeenCalledWith(amount);
  });

  it('should emit eventPrevious with amountToShow as number', () => {
    spyOn(component.eventPrevious, 'emit');

    component.previous();

    expect(component.eventPrevious.emit).toHaveBeenCalledWith(amount);
  });
});
