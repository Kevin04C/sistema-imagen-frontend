import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public EMAIL_PATTERN: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor() { }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqualFieldOneAndTwo: true });
        return { notEqualFieldOneAndTwo: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }

  public isInvalidField(form: FormGroup, field: string) {
    return form.get(field)?.invalid && form.get(field)?.touched || false;
  }
  public getFieldErrorMessage(form: FormGroup, field: string): string | null {
    const errors: ValidationErrors = form.get(field)?.errors ?? {};

    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `El campo debe tener ${errors['minlength'].requiredLength} caracteres como mínimo`;
        case 'pattern':
          const pattern = errors['pattern'].requiredPattern;
          if (pattern === this.EMAIL_PATTERN) {
            return 'El campo no es un correo válido';
          }
          break
        case 'notEqualFieldOneAndTwo':
          return 'Los campos no coinciden';
      }
    }
    return null;
  }


}
