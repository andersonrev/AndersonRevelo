import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

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
    expect(form.contains('id')).toBeTruthy();
    expect(form.contains('name')).toBeTruthy();
    expect(form.contains('description')).toBeTruthy();
    expect(form.contains('logo')).toBeTruthy();
    expect(form.contains('date_release')).toBeTruthy();
    expect(form.contains('date_revision')).toBeTruthy();
  });

  it('Should validate that the id entered is unique', () => {

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
    form.patchValue({
      id: '1234',
      name: 'test12',
      description: '1234567891011asdfadfsdf',
      logo: 'test.png',
      date_release: '2023-01-01',
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
      expect(component.form.value).toEqual(mockFormReset);
    }
    expect(component.form.invalid).toBeTrue();

  });

});
