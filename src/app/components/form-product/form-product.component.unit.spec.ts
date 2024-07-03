import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormProductComponent } from "./form-product.component";
import { AbstractControl } from "@angular/forms";

describe('Unit Testing Form Producto', () => {

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

    it('form should be invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('name field should be invalid when empty', () => {
        const nameControl: AbstractControl = component.form.controls['name'];
        expect(nameControl.valid).toBeFalse();
        if (nameControl.errors)
            expect(nameControl.errors['required']).toBeTruthy();
    });


    it('should validate id field correctly', () => {
        const id = component.form.controls['id'];

        id.setValue('');
        expect(id.errors?.['required'] ?? null).toBeTruthy();

        id.setValue('ab');
        expect(id.errors?.['minlength'] ?? null).toBeTruthy();

        id.setValue('abcdefghijk');
        expect(id.errors?.['maxlength'] ?? null).toBeTruthy();

        id.setValue('abc');
        expect(id.valid).toBeTruthy();
    });

    it('should validate name field correctly', () => {
        const name = component.form.controls['name'];

        name.setValue('');
        expect(name.errors?.['required']).toBeTruthy();

        name.setValue('abcd');
        expect(name.errors?.['minlength']).toBeTruthy();

        name.setValue('a'.repeat(101));
        expect(name.errors?.['maxlength']).toBeTruthy();

        name.setValue('Valid Name');
        expect(name.valid).toBeTruthy();
    });

    it('should validate description field correctly', () => {
        const description = component.form.controls['description'];

        description.setValue('');
        expect(description.errors?.['required']).toBeTruthy();

        description.setValue('short');
        expect(description.errors?.['minlength']).toBeTruthy();

        description.setValue('a'.repeat(201));
        expect(description.errors?.['maxlength']).toBeTruthy();

        description.setValue('This is a valid description.');
        expect(description.valid).toBeTruthy();
    });

    it('should validate logo field correctly', () => {
        const logo = component.form.controls['logo'];

        logo.setValue('');
        expect(logo.errors?.['required']).toBeTruthy();

        logo.setValue('valid_logo.png');
        expect(logo.valid).toBeTruthy();
    });

    it('should validate date_release field correctly', () => {
        const dateRelease = component.form.controls['date_release'];

        dateRelease.setValue('');
        expect(dateRelease.errors?.['required']).toBeTruthy();

        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        dateRelease.setValue(pastDate.toISOString().split('T')[0]);
        expect(dateRelease.errors?.['dateNotPass']).toBeTruthy();

        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        dateRelease.setValue(futureDate.toISOString().split('T')[0]);
        expect(dateRelease.valid).toBeTruthy();
    });

    it('should validate date_revision field correctly', () => {
        const dateRevision = component.form.controls['date_revision'];
    
        // Habilitamos el campo para las pruebas
        dateRevision.enable();
    
        dateRevision.setValue('');
        expect(dateRevision.errors?.['required']).toBeTruthy();
    
        const validDate = new Date().toISOString().split('T')[0];
        dateRevision.setValue(validDate);
        expect(dateRevision.valid).toBeTruthy();
      });
})