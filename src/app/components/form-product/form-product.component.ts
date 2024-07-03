import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {
  form!: FormGroup;

  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        // validacion custom
      ],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required],
        // fecha debe ser igual o mauor a la fecha actual
      ],
      date_revision: ['', [Validators.required,
        //se debe setear automaticamente 365 dias  al date_release
      ]],
    });
  }

  ngOnInit(): void {

  }
  onSubmit() {
    console.log('form', this.form.value);
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


}
