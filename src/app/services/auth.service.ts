import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface TmsUser {
  id?: string;
  email?: string;
  displayName: string;
  role: string;
}

export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<TmsUser | null>(null);
  private readonly accessTokenSignal = signal<string | null>(null);
  private readonly refreshTokenSignal = signal<string | null>(null);

  readonly accessToken = this.accessTokenSignal.asReadonly();
  readonly refreshToken = this.refreshTokenSignal.asReadonly();

  getAccessToken(): string | null {
    return this.accessTokenSignal();
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role || user?.role === 'Admin';
  }

  private decodeToken(token: string): TmsUser | null {
    try {
      const payload = token.split('.')[1];
      const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(normalizedPayload));

      const roleClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim].filter(Boolean);
      const role = roles[0] ?? decoded.role ?? 'Student';
      const displayName = decoded.name ?? decoded.FirstName ?? decoded.email ?? decoded.sub ?? 'User';

      return {
        id: decoded.sub,
        email: decoded.email ?? decoded.sub ?? '',
        displayName,
        role,
      };
    } catch {
      return null;
    }
  }

  private setSession(response: AuthResponse): void {
    this.accessTokenSignal.set(response.accessToken);
    this.refreshTokenSignal.set(response.refreshToken);

    const user = this.decodeToken(response.accessToken);
    this.currentUser.set(user);
  }

  logout(): void {
    this.accessTokenSignal.set(null);
    this.refreshTokenSignal.set(null);
    this.currentUser.set(null);
  }

  async login(credentials: LoginRequest): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>('/api/auth/login', credentials),
    );

    this.setSession(response);
  }
}
