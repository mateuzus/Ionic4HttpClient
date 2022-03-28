import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Student } from '../models/student';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public basePath = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  //Http Options
  // eslint-disable-next-line @typescript-eslint/member-ordering
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json'
    })
  };
  // Ocorreu um erro do lado do cliente ou da rede.
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      console.log(error.status, error.error);
    }
    // retorna um Observable com uma mensagem de erro voltada para o usuário
    return throwError('Algo ruím aconteceu; por favor, tente novamente mais tarde.');

  }

  //Criar um novo item
  createItem(item): Observable<Student> {
    return this.http.post<Student>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Pegar um estudante pelo ID
  getItem(id): Observable<Student> {
    return this.http.get<Student>(this.basePath + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Pegar lista de estudantes
  getList(): Observable<Student> {
    return this.http.get<Student>(this.basePath)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Atualizar o estudante pelo ID
  updateItem(id: number, item: any): Observable<Student> {
    return this.http
      .put<Student>(this.basePath + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //Deletar um item pelo ID
  deleteItem(id) {
    return this.http.delete<Student>(this.basePath + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
}
