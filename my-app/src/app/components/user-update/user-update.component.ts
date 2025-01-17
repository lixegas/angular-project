import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../models/user.dto';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  user: UserDTO = { id: 0, name: '', surname: '', email: '' }; 
  private destroy$ = new Subject<void>(); 

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

   ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.user.id = +(params.get('id') || 0); 
        this.userService.getUser(this.user.id)
          .pipe(takeUntil(this.destroy$)) 
          .subscribe(user => {
            this.user = user; 
          });
      });
  }

  updateUser(): void {
    this.userService.updateUser(this.user, this.user.id)
      .pipe(takeUntil(this.destroy$)) 
      .subscribe(() => {
        this.router.navigate(['/users']);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }
}

