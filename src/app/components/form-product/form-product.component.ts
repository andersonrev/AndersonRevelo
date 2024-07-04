import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductInterface, bodyProductUpdate } from '../../interfaces/product.interface';
import { formatDateWithYYYYMMDD } from '../../utilities/format-date.function';
import { dateNotLessThanCurrent } from './validators/date-validators.function';
import { ProductValidatorsService } from './validators/product-validators.service';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {
  form!: FormGroup;

  @Input()
  isEditing = false;

  @Input()
  productEditing: ProductInterface | undefined = undefined;

  errorMessages: {
    // required: () => string,
    // invalidId: () => string,
    [typeError: string]: (length?: number) => string
  } =
    {
      required: () => 'Este campo es requerido',
      minlength: (minlength?: number) => `Este campo debe tener al menos ${minlength} caracteres`,
      maxlength: (maxLength?: number) => `Este campo debe tener ${maxLength} caracteres como máximo`,
      invalidId: () => 'ID nó valido!',
    };

  // private productValidatorService = Inject(ProductValidatorsService);

  errorMessagesId: string[] = [];
  errorMessagesName: string[] = [];
  errorMessagesDescription: string[] = [];
  errorMessagesLogo: string[] = [];
  errorMessagesDateRelease: string[] = [];

  formSubscription!: Subscription;


  @Output()
  valueForm = new EventEmitter<ProductInterface | bodyProductUpdate>();

  constructor(private fb: FormBuilder, private productValidatorService: ProductValidatorsService) {
    this.form = this.fb.group({
      // id: ['',
      //   // [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      //   [asyncIdValidatorProduct(this.productValidatorService)]
      // ],
      id: ['',
        {
          Validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
          asyncValidators: [this.productValidatorService.validate.bind(this.productValidatorService)]
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
    console.log('form', this.form.getRawValue());
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
        next: (value) => {

          const idControl = this.form.get('id');

          if (idControl) this.errorMessagesId = this.setMessageErrorOnControl(idControl)

          const nameControl = this.form.get('name');

          if (nameControl) this.errorMessagesName = this.setMessageErrorOnControl(nameControl)

          const descriptionControl = this.form.get('description');

          if (descriptionControl) this.errorMessagesDescription = this.setMessageErrorOnControl(descriptionControl)

          const logoControl = this.form.get('logo');

          if (logoControl) this.errorMessagesLogo = this.setMessageErrorOnControl(logoControl)

          const date_releaseControl = this.form.get('date_release');

          if (date_releaseControl) this.errorMessagesDateRelease = this.setMessageErrorOnControl(date_releaseControl)


          if (value[0].date_release) {
            const dateRelease = new Date(value[0].date_release);

            dateRelease.setDate(dateRelease.getDate() + 365);

            this.form.get('date_revision')?.patchValue(dateRelease.toISOString().slice(0, 10));
          }


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

  setMessageErrorOnControl(control: AbstractControl) {
    let errorMessages: string[] = [];
    if ((control.dirty || control.touched) && control.errors) {
      errorMessages = Object.keys(control.errors).map(keyError => {
        if ((keyError === 'minlength' || keyError === 'maxlength') && control.errors) {
          const minMaxLength: number = control.errors[keyError].requiredLength;
          return this.errorMessages[keyError] ? this.errorMessages[keyError](minMaxLength) : 'Error desconocido'

        } else {
          return this.errorMessages[keyError] ? this.errorMessages[keyError]() : 'Error desconocido'
        }
      }
      );
    } else {
      errorMessages = [];
    }
    return errorMessages;
  }

  verAlgo() {
    // console.log(this.errorMessages['required']());
    // console.log(this.errorMessages['minlength'](3));
    // console.log(this.errorMessages['maxlength'](10));
    console.log(this.form);
  }





}

