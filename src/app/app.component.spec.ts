import { TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';
import { ToastTypeInterface } from './interfaces/toast.interface';

describe('AppComponent', () => {

  const showToastSubject = new Subject<ToastTypeInterface>();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'productos-financieros' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('productos-financieros');
  });

  it('should subscribe to showToastSubject on ngOnInit and call showToaster', () => {


    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();

    const soy = spyOn(component, 'showToaster');
    const toastType: ToastTypeInterface = { type: 'success', text: 'Test Toast' };
    showToastSubject.next(toastType);

    component.notificationService.showToastSubject.subscribe(resp => {
      expect(resp).toBe(toastType)
      expect(component.showToaster).toHaveBeenCalled();
    })

  });

  it('should create and clear the toast view in showToaster', (done) => {

    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const createEmbeddedViewSpy = spyOn(component.container, 'createEmbeddedView');
    const clearSpy = spyOn(component.container, 'clear');

    component.showToaster();

    expect(createEmbeddedViewSpy).toHaveBeenCalledWith(component.toats, component);

    setTimeout(() => {
      expect(clearSpy).toHaveBeenCalled();
      done();
    }, 1500);
  });

});
