import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductInterface, bodyProductUpdate } from '../../interfaces/product.interface';
import { formatDateWithYYYYMMDD } from '../../utilities/format-date.function';
import { dateNotLessThanCurrent } from './validators/date-validators.function';
import { ProductValidatorsService } from './validators/product-validators.service';

type fieldFormErrorMessages = {
  id: string[]
  name: string[]
  description: string[]
  logo: string[]
  date_release: string[],
  [other: string]: string[],
}

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {
  form!: FormGroup;

  @Input()
  isEditing = false;

  @Input()
  productEditing: ProductInterface | undefined = undefined;

  @Output()
  valueForm = new EventEmitter<ProductInterface | bodyProductUpdate>();

  errorMessages: {
    [typeError: string]: (length?: number) => string
  } =
    {
      required: () => 'Este campo es requerido',
      minlength: (minlength?: number) => `Este campo debe tener al menos ${minlength} caracteres`,
      maxlength: (maxLength?: number) => `Este campo debe tener máximo ${maxLength} caracteres`,
      invalidId: () => 'ID nó valido!',
      dateNotPass: () => 'La fecha tiene que ser mayor o igual a la actual',
    };


  errorMessagesByField: fieldFormErrorMessages = { id: [], name: [], description: [], logo: [], date_release: [] }

  formSubscription!: Subscription;

  constructor(private fb: FormBuilder, private productValidatorService: ProductValidatorsService) {
    this.form = this.fb.group({

      id: ['',
        {
          asyncValidators: [this.productValidatorService.validate.bind(this.productValidatorService)],
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        }
      ],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, dateNotLessThanCurrent()]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.isEditing && this.productEditing) {

      this.form.patchValue({
        id: this.productEditing.id,
        name: this.productEditing.name,
        description: this.productEditing.description,
        logo: this.productEditing.logo,
        date_release: this.productEditing.date_release,
        date_revision: this.productEditing.date_revision
      });
      this.form.controls['id'].disable();
    }
    this.manageErrorForm();

  }
  onSubmit() {
    this.valueForm.emit(this.form.getRawValue());
  }

  manageErrorForm() {
    this.formSubscription = combineLatest([this.form.valueChanges, this.form.statusChanges])
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(
          (prev, curr) => (
            prev[0].id === curr[0].id &&
            prev[0].name === curr[0].name &&
            prev[0].description === curr[0].description &&
            prev[0].logo === curr[0].logo &&
            prev[0].date_release === curr[0].date_release
          )
        )
      ).subscribe({
        next: ([values, status]) => {
          this.handleFormChanges(values);
        }
      }
      )
  }



  onReset() {
    if (this.isEditing) {

      this.form.patchValue({
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      });
    } else {

      this.form.patchValue({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      });

    }
  }

  setDateRevision() {

    const dateReleaseControlInput = this.form.get('date_release');
    if (dateReleaseControlInput && dateReleaseControlInput.valid) {

      const dateRevision = this.addDaystoDate(dateReleaseControlInput.value, 365);
      this.form.patchValue({ date_revision: formatDateWithYYYYMMDD(dateRevision) });
    } else {
      this.form.patchValue({ date_revision: '' });
    }
  }

  addDaystoDate(dateString: string, days: number) {
    const initialDate = new Date(dateString + 'T00:00:00');
    const dateRevision = new Date(initialDate);
    dateRevision.setDate(initialDate.getDate() + days);
    return dateRevision;
  }

  getMessageErrorControl(control: AbstractControl): string[] {
    let errorMessages: string[] = [];
    if ((control.dirty || control.touched) && control.errors) {
      errorMessages = Object.keys(control.errors).map(keyError => {
        if ((keyError === 'minlength' || keyError === 'maxlength') && control.errors) {
          const minMaxLength: number = control.errors[keyError].requiredLength;
          return this.errorMessages[keyError] ? this.errorMessages[keyError](minMaxLength) : 'Error desconocido'

        } else if (keyError === 'dateNotPass') {
          return this.errorMessages[keyError]();
        }
        else {
          return this.errorMessages[keyError] ? this.errorMessages[keyError]() : 'Error desconocido'
        }
      }
      );
    }
    return errorMessages;
  }


  setControlErrorMessage(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
      const errorMessages = this.getMessageErrorControl(control);
      this.errorMessagesByField[controlName] = errorMessages;
    }
  }

  handleFormChanges(values: any): void {
    this.setControlErrorMessage('id');
    this.setControlErrorMessage('name');
    this.setControlErrorMessage('description');
    this.setControlErrorMessage('logo');
    this.setControlErrorMessage('date_release');

    if (values.date_release) {
      const dateRelease = new Date(values.date_release);
      dateRelease.setDate(dateRelease.getDate() + 365);
      this.form.get('date_revision')?.patchValue(dateRelease.toISOString().slice(0, 10));
    }
  }

}

