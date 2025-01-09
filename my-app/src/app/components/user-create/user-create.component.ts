import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../models/user.dto';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  newUser: UserDTO = { id: 0, name: '', surname:'', email: '' };

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
