import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from '../../enviroments/environment';  
import { UserDTO } from '../models/user.dto';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  
    private apiUrl = `${environment.apiBaseUrl}/api/v1/user`; 

    constructor(private http: HttpClient) {}


    getAllUsers(): Observable<UserDTO[]> {
        return this.http.get<UserDTO[]>(`${this.apiUrl}/all`);
    }

    getUser(id: number): Observable<UserDTO> {
        return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);  
    }

    createUser(user: UserDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(`${this.apiUrl}/`, user);  
    }

    updateUser(user: UserDTO, id: number): Observable<UserDTO> {
        return this.http.put<UserDTO>(`${this.apiUrl}/${id}`, user);
    }
    
    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }    
}
