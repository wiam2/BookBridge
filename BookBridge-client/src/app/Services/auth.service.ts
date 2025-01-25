
import { Bibliothecaire } from '../models/Bibliothecaire.model';
import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams , HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/User.model'; 

import { throwError } from 'rxjs'; // Importation manquante
import { Lecteur } from '../models/Lecteur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'https://localhost:7057';

  constructor(private httpClient: HttpClient) {}

  /**
   * Crée un recruteur dans le système
   */
  CreateLecteur(Lecteur: Lecteur): Observable<Object> {
    console.log(Lecteur);
    return this.httpClient.post(`${this.baseURL}/registerLecteur`,Lecteur).pipe(
      catchError((error) => {
        console.error('Error creating recruteur:', error);
        return throwError(() => new Error('Erreur lors de la création du recruteur'));
      })
    );
  }

  /**
   * Crée un candidat dans le système
   */
  CreateBibliothécaire(Bibliothécaire: Bibliothecaire): Observable<Object> {
    console.log(Bibliothécaire);
    return this.httpClient.post(`${this.baseURL}/registerBiblio`, Bibliothécaire).pipe(
      catchError((error) => {
        console.error('Error creating condidat:', error);
        return throwError(() => new Error('Erreur lors de la création du candidat'));
      })
    );
  }

  /**
   * Retourne le rôle de l'utilisateur connecté
   */
  currentUserRole(): string | null {
    const token = this.getToken();

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);
        return tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Retourne les informations de l'utilisateur connecté
   */
  currentUser(): User | null {
    const token = this.getToken();

    if (token) {
      try {
        const tokenPayload: any = jwtDecode(token);
       
        return {
          Id: tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
          Email: tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          Password: '',
          ConfirmPassword: '',
          Nom: '',
          Prenom: '',
        
        };
      } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Authentifie un utilisateur
   */
  login(credentials: { Email: string; Password: string }): Observable<any> {
    const loginUrl = `${this.baseURL}/login`;
    const headers = { 'Content-Type': 'application/json' };

    return this.httpClient.post<any>(loginUrl, credentials, { headers }).pipe(
      map((response) => {
        console.log('Login successful:', response);
        if (response && response.token) {
          localStorage.setItem('JwtToken', response.token);
          console.log(localStorage.getItem('JwtToken'));
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Erreur lors de la connexion'));
      })
    );
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('JwtToken');
  }

  /**
   * Retourne le token JWT stocké
   */
  getToken(): string | null {
    return localStorage.getItem('JwtToken'); // Retourne directement le token sans JSON.parse
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  /**
   * Réinitialise le mot de passe d'un utilisateur
   */
  forgetPassword(email: string): Observable<Object> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.post(`${this.baseURL}/api/Account/forget_password`, {}, { params }).pipe(
      catchError((error) => {
        console.error('Error in forgetPassword:', error);
        return throwError(() => new Error('Erreur lors de la demande de réinitialisation du mot de passe'));
      })
    );
  }

  /**
   * Déconnecte automatiquement l'utilisateur après l'expiration du token
   */
  autoLogout(expirationDuration: number): void {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
