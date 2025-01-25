import {Component, OnInit} from '@angular/core';
import {Livre} from "../models/Livre.model";
import { Book2Service } from '../Services/book2.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Livre | undefined;
  bookId: number = 0;

  constructor(
    private bookService: Book2Service,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Récupère l'ID du livre à partir de l'URL
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.getBookDetails();
    });
  }

  // Méthode pour récupérer les détails du livre
  getBookDetails(): void {
    this.bookService.getBookById(this.bookId).subscribe(
      (data: Livre) => {
        this.book = data; // Assigner les détails récupérés à la propriété 'livre'
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du livre:', error);
      }
    );
  }
  borrowBook(): void {
    alert(`Vous avez emprunté le livre "${this.book?.titre}" !`);  // Exemple de message (ajustez la logique selon votre besoin)
    // Ajoutez ici la logique pour marquer le livre comme emprunté
  }

}
