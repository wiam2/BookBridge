import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bibliothecaire } from '../models/Bibliothecaire.model';

@Injectable({
  providedIn: 'root'
})
export class BiblioService {

 

  constructor(private httpClient: HttpClient) {}

  GetProfilebiblio(id:string):Observable<Bibliothecaire>{
    return this.httpClient.get<Bibliothecaire>(`https://localhost:7057/affichagebibio/${id}`);
}
}

