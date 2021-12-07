import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";

export interface LoginResponse {
  access_token: string;
}

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  login( username: string, password: string): Observable<LoginResponse> {
    localStorage.removeItem(TOKEN_KEY);

    return this.httpClient.post<LoginResponse>(environment.api + '/auth/login', {
      username: username,
      password: password
    }).pipe(
      tap( response => {

        if (response.access_token) {
          localStorage.setItem(TOKEN_KEY, response.access_token);
        }
      })
    );
  }

  checkEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<{ available: boolean }>(`${environment.api}/auth/check-email`, { params })
      .pipe(
        map(result => result.available),
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
