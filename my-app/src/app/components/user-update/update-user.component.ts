import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../models/user.dto';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: UserDTO = { id: 0, name: '', surname: '', email: '' }; 

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user.id = +(params.get('id') || 0); 
      this.userService.getUser(this.user.id).subscribe(user => {
        this.user = user; 
      });
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user, this.user.id).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}

