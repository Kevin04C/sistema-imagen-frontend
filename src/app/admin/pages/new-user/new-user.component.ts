import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/Rol.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserRegister } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'admin-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  public rolesData: Role[] = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public newUseForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    correo: ['', [Validators.required,
    Validators.pattern(this.validatorService.EMAIL_PATTERN)]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
    confirmarContrasena: ['', [Validators.required, Validators.minLength(8)]],
    roles_id: this.fb.array([], [Validators.required]),
  }, {
    validators: [this.validatorService.isFieldOneEqualFieldTwo('contrasena', 'confirmarContrasena')]
  });

  constructor(
    private roleService: RoleService,
    private validatorService: ValidatorService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.roleService.getRoles()
      .subscribe({
        next: (roles) => {
          this.rolesData = roles.map((rol: Role) => (rol))
        },
      });

    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: "id",
      textField: "nombre",
      selectAllText: "Selecionar Todos",
      unSelectAllText: "Selecionar Todos",
      enableCheckAll: false,
    };


  }

  public onSubmit(): void {
    this.validateHasRolesSelected();
    if (this.newUseForm.invalid) {
      this.newUseForm.markAllAsTouched();
      return;
    }

    const { nombre, apellidos, dni, correo, contrasena, roles_id } = this.newUseForm.value;
    const userRegister: UserRegister = { nombre, apellidos, dni, correo, roles_id, contrasena }
    this.userService.registerUser(userRegister)
      .subscribe({
        next: () => {
          this.clearFields();
          Swal.fire('Usuario creado', 'Usuario creado con exito', 'success');
        },
        error: (err: string[]) => {
          const errosTemplate = err.map((error) => `<p>${error}</p>`).join(' ');
          Swal.fire('Error', errosTemplate, 'error');
        }
      })
  }


  public clearFields(): void {
    this.newUseForm.reset();
    this.rolesFormArray.clear();
  }

  public get rolesFormArray() {
    return this.newUseForm.get('roles_id') as FormArray;
  }

  public isInvalidField(field: string): boolean {
    return this.validatorService.isInvalidField(this.newUseForm, field);
  }
  public getErrorMessage(field: string): string | null {
    return this.validatorService.getFieldErrorMessage(this.newUseForm, field);
  }
  public onItemSelect(item: any) {
    const newFormControl = new FormControl(item.id);
    this.rolesFormArray.push(newFormControl);
  }

  public onDeSelect = (item: any) => {
    // recuperamos el index del item deseleccionado
    const index = this.rolesFormArray.controls.findIndex((rol) => rol.value === item.id);
    this.rolesFormArray.removeAt(index);

    // validar que haya al menos un rol seleccionado
    this.validateHasRolesSelected();
  }

  public validateHasRolesSelected() {
    this.rolesFormArray.length > 0
      ? this.newUseForm.setErrors(null)
      : this.newUseForm.setErrors({ nothingRolesSelected: true });
  }

  public nothingRolesSelected(): boolean {
    return this.newUseForm.hasError('nothingRolesSelected');
  }

}
