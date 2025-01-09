import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../models/user.dto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  users: UserDTO[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  navigateToUpdate(userId: number): void {
    this.router.navigate(['/update-user', userId]); 
  }

  navigateToDelete(userId: number): void {
    this.router.navigate(['/delete-user', userId]); 
  }
}

