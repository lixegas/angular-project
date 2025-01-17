import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../models/user.dto';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  users: UserDTO[] = [];
  private destroy$ = new Subject<void>(); 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Errore durante il caricamento degli utenti:', err);
          return []; 
        })
      )
      .subscribe(data => {
        this.users = data;
      });
  }

  navigateToUpdate(userId: number): void {
    this.router.navigate(['/update-user', userId]); 
  }

  navigateToDelete(userId: number): void {
    this.router.navigate(['/delete-user', userId]); 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); 
  }
}
