import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UpdateUserComponent } from './components/user-update/update-user.component';
import { DeleteUserComponent } from './components/delete-update/delete-user.component';


export const routes: Routes = [
  { path: 'users', component: HomeComponent },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'delete-user/:id', component: DeleteUserComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);
