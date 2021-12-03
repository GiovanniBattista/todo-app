import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

export interface LoginResponse {
  access_token?: string;
  jwt?: string;
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

    return this.httpClient.post<LoginResponse>(environment.api + '/auth/local', {
      identifier: username,
      password: password
    }).pipe(
      tap( response => {
        console.log("response: ", response);
        if (response.access_token) {
          console.log("Store access_token");
          localStorage.setItem(TOKEN_KEY, response.access_token);
        }
        if (response.jwt) {
          console.log("Store jwt");
          localStorage.setItem(TOKEN_KEY, response.jwt);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
