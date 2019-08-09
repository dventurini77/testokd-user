import { IUser } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  addUser(user: IUser): Observable<IUser> {
    user.ID = null;
    return this.http.post<IUser>(this.apiUrl, user).pipe(
      tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.apiUrl + '/' + user.ID, user).pipe(
      map(() => user),
      catchError(this.errorHandler)
    );
  }

  deleteUser(user: IUser): Observable<IUser> {
    return this.http.delete<IUser>(this.apiUrl + '/' + user.ID).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
