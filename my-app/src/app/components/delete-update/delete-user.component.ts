import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../models/user.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
    selector: 'app-delete-user',
    standalone: true,
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.css'],
    imports: [CommonModule, FormsModule]
})
export class DeleteUserComponent {
    user: UserDTO = {id: 0, name: '', surname: '', email: ''};
    loading: boolean = false;
    deleted: boolean = false;
  
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const userId = +(params.get('id') || 0); 
            if (userId > 0) {
                
                this.userService.getUser(userId).subscribe(user => {
                    this.user = user;
                });
            }
        });
    }

    deleteUser(): void {
        this.loading = true;
        this.userService.deleteUser(this.user.id).subscribe(() => {
          this.loading = false;
          this.deleted = true;
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000); 
        });
      }
    
      cancelDelete(): void {
        this.router.navigate(['/users']);
      }   
}