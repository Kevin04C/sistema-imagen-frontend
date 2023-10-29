import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { User, UserUpdateData } from '../../models/user.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/models/Rol.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RoleService } from 'src/app/shared/services/role.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public rolesData: Role[] = [];
  public selectedItems: Array<Role> = [];
  public dropdownSettings: IDropdownSettings = {};
  private idUser: number = 0;

  public user$ = new BehaviorSubject<User | null>(null);
  public userForm = this.fb.group({
    nombre: [{ value: '', disabled: true }],
    apellidos: [{ value: '', disabled: true }],
    dni: [{ value: '', disabled: true }],
    correo: ['', [Validators.required, Validators.pattern(this.validatorService.EMAIL_PATTERN)]],
    activo: [false, [Validators.required]],
    roles_id: []
  });

  public changePasswordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  }, {
    validators: this.validatorService.isFieldOneEqualFieldTwo('password', 'confirmPassword')
  })


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private roleService: RoleService,
    private validatorService: ValidatorService,
  ) {
    this.roleService.getRoles()
      .subscribe((roles) => {
        this.rolesData = roles.map((rol: Role) => (rol))
      });
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.idUser = id;
          return this.userService.getUserById(id);
        })
      )
      .subscribe(user => {
        if (user === undefined) return this.router.navigateByUrl('/admin/list-users')
        this.user$.next(user);
        const rolesSelected = user.roles_id.map((userRolId) => {
          return this.rolesData.find((rol) => rol.id === userRolId) as Role;
        })
        this.selectedItems = rolesSelected;
        return;
      })


    this.user$
      .subscribe(user => {
        if (user === null && this.selectedItems.length <= 0) return;
        console.log(this.selectedItems)
        this.userForm.reset({
          nombre: user?.nombre,
          apellidos: user?.apellidos,
          dni: user?.dni,
          correo: user?.correo,
          activo: user?.activo,
          roles_id: [] as any
        })
      })

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "nombre",
      selectAllText: "Selecionar TODO",
      unSelectAllText: "Deseleccionar TODO",
      allowSearchFilter: false
    };
  }

  public updateData(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { correo, activo, roles_id } = this.userForm.value;
    const userUpdate = { correo, activo };
    // this.userService.updateUser(this.idUser, userUpdate)

  }

  public updatePassword = () => {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    const { password } = this.changePasswordForm.value;
    this.userService.updatePasswordUser(this.idUser, password as string)
      .subscribe({
        next: () => {
          this.changePasswordForm.reset();
          Swal.fire('Contraseña actualizada', 'La contraseña se ha actualizado correctamente', 'success');
        },
        error: (err) => {
          Swal.fire('Error', err, 'error');
        }
      })
  }


  // public get rolesFormArray() {
  //   return this.userForm.get('roles_id') as FormArray;
  // }

  public onItemSelect(item: any) {
    // const newFormControl = new FormControl(item.id);
    // this.rolesFormArray.push(newFormControl);
  }

  public onDeSelect = (item: any) => {
    // const index = this.rolesFormArray.controls.findIndex((rol) => rol.value === item.id);
    // this.rolesFormArray.removeAt(index);
  }

  public isInvalidField(form: FormGroup, field: string): boolean {
    return this.validatorService.isInvalidField(form, field);
  }
  public getErrorMessage(form: FormGroup, field: string): string | null {
    return this.validatorService.getFieldErrorMessage(form, field);
  }

}
