import { Injectable } from '@angular/core';
import { Lecteur } from '../models/Lecteur.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LecteurService {

  constructor(private httpClient: HttpClient) {}
  getLecteurs() : Observable<Lecteur[]>{
    return this. httpClient.get<Lecteur[]>(`https://localhost:7057/affichagelecteurs`)
  
  }
  deleteLecteur(id: string): Observable<void> {
    const url = `https://localhost:7057/Deletelecteur/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
