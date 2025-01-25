
import {Component, OnInit} from '@angular/core';
import { Book2Service } from '../Services/book2.service';
import {Router} from "@angular/router";
import {Livre} from "../models/Livre.model";


@Component({
  selector: 'app-espace-lecteur',
  templateUrl: './espace-lecteur.component.html',
  styleUrls: ['./espace-lecteur.component.css']
})




export class EspaceLecteurComponent implements OnInit {
  books: Livre[] = []; // Liste des livres
  titre: string = '';
  auteur: string = '';
  genre: string = '';
  anneePublication: number | null = null;
  disponiblesUniquement: boolean = false;
  showSearchForm: boolean = false;  // Variable pour afficher/masquer le formulaire

  constructor(private bookService: Book2Service,
              private router: Router) {}

  ngOnInit(): void {
    // Charger les livres au démarrage
    this.loadBooks();
  }

  // Charger tous les livres
  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des livres', error);
      }
    });
  }
  loadBookDetails(bookId: number): void {
    this.router.navigate(['/book-details', bookId]);
  }
  rechercherLivres(): void {
    this.bookService.rechercherLivres(
      this.titre,
      this.auteur,
      this.genre,
      this.anneePublication,
      this.disponiblesUniquement
    ).subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche des livres', err);
      }
    });
  }

  toggleSearchForm(): void {
    this.showSearchForm = !this.showSearchForm;  // Permet de basculer l'affichage du formulaire
  }

  protected readonly length = length;
  // Méthode pour réinitialiser tous les filtres
  resetFilters(): void {
    this.titre = '';
    this.auteur = '';
    this.genre = '';
    this.anneePublication = null;
    this.disponiblesUniquement = false;
    this.loadBooks();
    this.showSearchForm=false;
  }

}
