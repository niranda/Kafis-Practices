import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JWTService {

  private jwtToken: string;
  private decodedToken: { [key: string]: string };

  constructor() {
  }

  public get isTokenExpired(): boolean {
    const expiryTime: number = Number(this.getExpiryTime()) * 1000;
    return expiryTime ? (expiryTime - (new Date()).getTime()) < 0 : false;
  }

  public setToken(token: string): void {
    if (token) {
      this.jwtToken = token;
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  public getUserId(): string {
    return this.decodedToken && this.decodedToken.id;
  }

  public getUserName(): string {
    return this.decodedToken && this.decodedToken.username;
  }

  public getUserRole(): string {
    return this.decodedToken && this.decodedToken.role;
  }

  public getExpiryTime(): string {
    return this.decodedToken && this.decodedToken.exp;
  }
}
