import { Component, OnInit } from '@angular/core';
import { LivroService } from './services/livro.service';
import { Livro } from './models/livro';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  livro = {} as Livro;
  livros: Livro[];

  constructor(private livroService: LivroService) {}
  
  ngOnInit() {
    this.getLivros();
  }

  //Cria ou Altera um livro ...
  saveLivro(form: NgForm) {
    if (this.livro.id !== undefined) {
      this.livroService.updateLivro(this.livro).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.livroService.saveLivro(this.livro).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //Retorna todos os Livros do Json-Server-Crud ...
  getLivros() {
    this.livroService.getLivros().subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  //Apaga um Livro ...
  deleteLivro(livro: Livro) {
    this.livroService.deleteLivro(livro).subscribe(() => {
      this.getLivros();
    });
  }

  //Copia o livro para ser editado ...
  editLivro(livro: Livro) {
    this.livro = { ... livro };
  }

  //Limpa o Formulário ...
  cleanForm(form: NgForm) {
    this.getLivros();
    form.resetForm();
    this.livro = {} as Livro;
  }
}