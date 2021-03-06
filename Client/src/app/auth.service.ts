import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export interface UserDetails {
  id: number;
  email: string;
  username: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  aboutMe: string;
  exp: number;
  iat: number;
}
interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  id: number;
  email: string;
  username: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  aboutMe: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem("userToken", token);
  }
  private getToken(): string {
    return localStorage.getItem("userToken");
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post("http://localhost:4000/users/register", user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post("http://localhost:4000/users/login", user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public profile(): Observable<any> {
    return this.http.get("http://localhost:4000/users/profile", {
      headers: { Authorization: `${this.getToken()}` },
    });
  }

  public logout(): void {
    window.localStorage.removeItem("userToken");
    this.router.navigateByUrl("/");
  }
}
