import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Livre} from "../models/Livre.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://localhost:7057/api/Livres';

  constructor(private http: HttpClient) {}

  // Récupérer tous les livres
  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Récupérer les détails d'un livre spécifique
  getBookById(bookId: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.baseUrl}/${bookId}`);
  }
  // Fonction pour rechercher des livres avec les paramètres
  rechercherLivres(
    titre?: string,
    auteur?: string,
    genre?: string,
    anneePublication?: number | null,
    disponiblesUniquement?: boolean
  ): Observable<Livre[]> {
    let params = new HttpParams();

    // Ajout de chaque paramètre à l'URL si il est défini
    if (titre) {
      params = params.append('titre', titre);
    }
    if (auteur) {
      params = params.append('auteur', auteur);
    }
    if (genre) {
      params = params.append('genre', genre);
    }
    if (anneePublication) {
      params = params.append('anneePublication', anneePublication.toString());
    }
    if (disponiblesUniquement !== undefined) {
      params = params.append('disponiblesUniquement', disponiblesUniquement.toString());
    }

    return this.http.get<Livre[]>(`${this.baseUrl}/rechercher`, { params });
  }

  saveLivre(livre: { image: string; titre: string; genre: string; nombreCopies: number; auteur: string; editeur: string }): Observable<Livre> {
    return this.http.post<Livre>(this.baseUrl, livre); // Effectuer un POST pour sauvegarder
  }

  deleteLivre(id: number): Observable<Livre> {
    return this.http.delete<Livre>(`${this.baseUrl}/${id}`);
  }
  // Mettre à jour un livre existant
  updateLivre(id: number, livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.baseUrl}/${id}`, livre);
  }
}
