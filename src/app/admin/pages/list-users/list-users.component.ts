import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OnInit } from '@angular/core'
import { User } from '../../models/user.model';

@Component({
  selector: 'admin-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  public users: User[] = []

  constructor(
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe({
        next: (resp) => {
          this.users = resp
        },
        error: (err) => {
          console.log(err)
        }
      })
  }




}
