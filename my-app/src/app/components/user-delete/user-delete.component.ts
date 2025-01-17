import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserDTO } from '../../models/user.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-delete-user',
    standalone: true,
    templateUrl: './user-delete.component.html',
    styleUrls: ['./user-delete.component.css'],
    imports: [CommonModule, FormsModule]
})
export class DeleteUserComponent implements OnInit, OnDestroy {
    user: UserDTO = { id: 0, name: '', surname: '', email: '' };
    loading: boolean = false;
    deleted: boolean = false;
    errorMessage: string = '';
    private destroy$ = new Subject<void>();

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
                const userId = +(params.get('id') || 0); 
                if (userId > 0) {
                    this.userService.getUser(userId)
                        .pipe(
                            takeUntil(this.destroy$),
                            catchError(err => {
                                this.errorMessage = 'Errore durante il caricamento dell\'utente.';
                                console.error(err);
                                return [];
                            })
                        )
                        .subscribe(user => {
                            this.user = user;
                        });
                }
            });
    }

    deleteUser(): void {
        this.loading = true;
        this.userService.deleteUser(this.user.id)
            .pipe(
                takeUntil(this.destroy$),
                catchError(err => {
                    this.loading = false;
                    this.errorMessage = 'Errore durante la cancellazione dell\'utente.';
                    console.error(err);
                    return [];
                })
            )
            .subscribe(() => {
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
