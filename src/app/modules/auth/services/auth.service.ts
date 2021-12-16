import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, updateProfile, User, UserCredential, signInWithEmailAndPassword, authState, signOut } from "@angular/fire/auth";
import { from, map, Observable, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";

export interface LoginResponse {
  access_token: string;
}

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private httpClient: HttpClient,
    private auth: Auth) {

      this.user$ = authState(this.auth);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      map(user => user != null)
    );
  }

  register( email: string, password: string, firstName: string, lastName: string) {
    const registerPromise = createUserWithEmailAndPassword(this.auth, email, password);
    const observable = from(registerPromise);
    return observable.pipe(
      switchMap(response => {
        return updateProfile(response.user, {
          displayName: firstName + ' ' + lastName,
        })
      }),
    );
  }

  login( email: string, password: string): Observable<UserCredential> {
    const loginPromise = signInWithEmailAndPassword(this.auth, email, password);
    const observable = from(loginPromise);

    return observable;
  }

  checkEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<{ available: boolean }>(`${environment.api}/auth/check-email`, { params })
      .pipe(
        map(result => result.available),
      );
  }

  logout() {
    return from(signOut(this.auth));
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
