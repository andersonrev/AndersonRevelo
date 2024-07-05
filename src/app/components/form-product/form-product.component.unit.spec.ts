import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { FormProductComponent } from "./form-product.component";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Subject } from "rxjs";

describe('Unit Testing Form Producto', () => {

    let component: FormProductComponent;
    let fixture: ComponentFixture<FormProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormProductComponent, HttpClientTestingModule],
            providers: [FormBuilder]
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


    xit('should validate id field correctly', () => {
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
        pastDate.setDate(pastDate.getDate() - 10);
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

    it('should return correct messages depend type Error', () => {
        expect(component.errorMessages['required']()).toEqual('Este campo es requerido');
        const testnumber = 4;
        expect(component.errorMessages['maxlength'](testnumber)).toEqual(`Este campo debe tener máximo ${testnumber} caracteres`);
        expect(component.errorMessages['minlength'](testnumber)).toEqual(`Este campo debe tener al menos ${testnumber} caracteres`);
        expect(component.errorMessages['invalidId']()).toEqual('ID nó valido!');
        expect(component.errorMessages['dateNotPass']()).toEqual('La fecha tiene que ser mayor o igual a la actual');
    });

    it('should return empty array', () => {

        const nameControl: AbstractControl = component.form.controls['name'];
        const responseMesages = component.getMessageErrorControl(nameControl);
        expect(responseMesages.length).toEqual(0);
    });

    it('should return array with error message', () => {

        const nameControl: any = component.form.controls['name'];
        nameControl.errors = { required: true, maxlength: true };
        nameControl.touched = true;
        const responseMesages = component.getMessageErrorControl(nameControl);
        console.log(nameControl);
        expect(responseMesages.length).toBeGreaterThan(0);
    });

    it('should compare form for setting errors', () => {
        const spy = spyOn(component, 'manageErrorForm').and.callFake(() => {
            [{ name: 'test', id: '' }, 'INVALID']
        });


        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    });

    it('should handle form value changes and set error messages', fakeAsync(() => {


        const spySetErrorMessages = spyOn(component, 'setControlErrorMessage');

        const spyManage = spyOn(component, 'manageErrorForm').and.callFake(() => {
            [{ name: 'test', id: '', date_release: '2024-08-10' }, 'INVALID']
        });


        component.ngOnInit();


        expect(spyManage).toHaveBeenCalled();

        component.form.get('name')?.setValue('a'.repeat(11));
        tick(1000);

        expect(spySetErrorMessages).toHaveBeenCalledTimes(5);
   
    }));

})