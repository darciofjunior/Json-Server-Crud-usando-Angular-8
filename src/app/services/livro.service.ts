import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  url = 'http://localhost:3000/livros'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Retorna todos os Livros ...
  getLivros(): Observable<Livro[]> {
    return this.httpClient.get<Livro[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //Retorna o Livro pelo ID ...
  getLivroById(id: number): Observable<Livro> {
    return this.httpClient.get<Livro>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Cria um Livro ...
  saveLivro(livro: Livro): Observable<Livro> {
    return this.httpClient.post<Livro>(this.url, JSON.stringify(livro), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //Atualiza um Livro ...
  updateLivro(livro: Livro): Observable<Livro> {
    return this.httpClient.put<Livro>(this.url + '/' + livro.id, JSON.stringify(livro), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Apaga um Livro ...
  deleteLivro(livro: Livro) {
    return this.httpClient.delete<Livro>(this.url + '/' + livro.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Manipulação de erros ...
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
