import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UpdateUserComponent } from './components/user-update/user-update.component';
import { DeleteUserComponent } from './components/user-delete/user-delete.component';


export const routes: Routes = [
  { path: 'users', component: HomeComponent },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'delete-user/:id', component: DeleteUserComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);
