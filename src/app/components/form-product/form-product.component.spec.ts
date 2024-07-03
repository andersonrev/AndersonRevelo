import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { formatDateWithYYYYMMDD } from '../../utilities/format-date.function';
import { FormProductComponent } from './form-product.component';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProductComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with ID, NOMBRE, DESCRIPCION, LOGO, FECHA LIBERACION, FECHA REVISION', () => {
    const form = component.form;

    expect(form.get('id')).toBeTruthy();
    expect(form.get('name')).toBeTruthy();
    expect(form.get('description')).toBeTruthy();
    expect(form.get('logo')).toBeTruthy();
    expect(form.get('date_release')).toBeTruthy();
    expect(form.get('date_revision')).toBeTruthy();
  });

  it('should be mandatory the fields ID, NOMBRE, DESCRIPCION, LOGO, FECHA LIBERACION, FECHA REVISION', () => {
    const form = component.form;

    form.patchValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });

    expect(form.get('id')?.valid).toBeFalsy();
    expect(form.get('name')?.valid).toBeFalsy();
    expect(form.get('description')?.valid).toBeFalsy();
    expect(form.get('logo')?.valid).toBeFalsy();
    expect(form.get('date_release')?.valid).toBeFalsy();
    expect(form.get('date_revision')?.valid).toBeFalsy();
  })

  it('should block the submit button when the form is invalid', () => {
    const form = component.form;

    form.patchValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
    fixture.detectChanges();
    expect(form.invalid).toBeTrue();

    const buttonSubmit: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-submit')).nativeElement;
    expect(buttonSubmit.disabled).toBeTrue();

  });

  it('should enabled the submit button when the form is valid', () => {

    const form = component.form;
    const date = new Date();

    const dateString = formatDateWithYYYYMMDD(date);

    form.patchValue({
      id: '1234',
      name: 'test12',
      description: '1234567891011asdfadfsdf',
      logo: 'test.png',
      date_release: dateString,
      date_revision: '2024-01-01',
    });

    fixture.detectChanges();
    expect(form.valid).toBeTrue();
    const buttonSubmit: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-submit')).nativeElement;
    expect(buttonSubmit.disabled).toBeFalse();

  });

  it('should reset the form when click on the reset button', () => {

    const buttonSubmit: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-reset')).nativeElement;
    buttonSubmit.click();

    const isEditing = component.isEditing;

    let mockFormReset: any = {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    }

    if (isEditing) {
      delete mockFormReset.id;
      expect(component.form.value).toEqual({ ...mockFormReset, id: component.form.get('id') });
    } else {
      expect(component.form.getRawValue()).toEqual(mockFormReset);
    }
    expect(component.form.invalid).toBeTrue();

  });

  it('should send {date_revision: "" } when date is less than today', () => {

    const date = formatDateWithYYYYMMDD(new Date('2023-01-01'));
    component.form.patchValue({ date_release: date });

    const spyForm = spyOn(component.form, 'patchValue');

    component.setDateRevision();

    expect(spyForm).toHaveBeenCalledWith({ date_revision: '' });
  });

  it('should send {date_revision: "correct date" } when date is correct', () => {

    const date = formatDateWithYYYYMMDD(new Date());
    component.form.patchValue({ date_release: date });

    const spyForm = spyOn(component.form, 'patchValue');

    component.setDateRevision();

    const dateSucces = component.addDaystoDate(component.form.get('date_release')?.value, 365);

    expect(spyForm).toHaveBeenCalledWith({ date_revision: formatDateWithYYYYMMDD(dateSucces) });
  });

});
