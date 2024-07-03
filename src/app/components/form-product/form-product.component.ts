import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateNotLessThanCurrent } from './validators/date-validators.function';
import { formatDateWithYYYYMMDD } from '../../utilities/format-date.function';
import { ProductInterface, bodyProductUpdate } from '../../interfaces/product.interface';

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

  @Output()
  valueForm = new EventEmitter<ProductInterface | bodyProductUpdate>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        // validacion custom
      ],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, dateNotLessThanCurrent()]],
      date_revision: [{ value: '', disabled: true }, [Validators.required,
      ]],
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

  }
  onSubmit() {
    console.log('form', this.form.getRawValue());
    this.valueForm.emit(this.form.getRawValue());
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



}

