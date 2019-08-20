import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Client } from '../model/client';
import { ClientRecord } from '../model/client-record';

// Adapted from Angular's Tour of Heroes: https://angular.io/tutorial/toh-pt6
@Injectable({ providedIn: 'root' })
export class ClientService {
  private clientsUrl = 'https://testbankapi.firebaseio.com/clients.json'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    const isString = (val: any) => typeof val === 'string';
    const isValidDate = (val: any) =>
      isString(val) &&
      /^((0[1-9])|(1\d)|(2\d)|3[0-1])-((0[1-9])|1[0-2])-\d\d\d\d$/.test(val);
    const isInThePast = (val: string) =>
      new Date(
        val
          .split('-')
          .reverse()
          .join('-'),
      ) < new Date();
    const isValidBirthdate = (val: any) => isValidDate(val) && isInThePast(val);
    const isValidIdentification = (val: any) =>
      isString(val) && /^\d+$/.test(val);
    const isValidName = (val: any) => isString(val) && /[~\w]+/.test(val);
    const isValidClient = (client: Client) =>
      isValidBirthdate(client.birthdate) &&
      isValidIdentification(client.identification) &&
      isValidName(client.firstname) &&
      isValidName(client.lastname);

    const filterUniqueClients = (clients: Client[]) => {
      const visitedIdentifications = new Set();
      const uniqueClients = [];
      clients.forEach(client => {
        if (!visitedIdentifications.has(client.identification)) {
          uniqueClients.push(client);
          visitedIdentifications.add(client.identification);
        }
      });
      return uniqueClients;
    };
    const convertToArray = (clients: { [key: string]: Client }) =>
      Object.keys(clients).map(key => clients[key]);
    const filterValidClients = (clients: Client[]) =>
      clients.filter(isValidClient);

    return this.http.get<{ [key: string]: Client }>(this.clientsUrl).pipe(
      map(convertToArray),
      map(filterValidClients),
      map(filterUniqueClients),
      tap(_ => this.log('fetched clients')),
      catchError(this.handleError<Client[]>('getClients', [])),
    );
  }

  /** GET client by id. Will 404 if id not found */
  getClient(id: string): Observable<Client> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched client id=${id}`)),
      catchError(this.handleError<Client>(`getClient id=${id}`)),
    );
  }

  //////// Save methods //////////

  /** POST: add a new client to the server */
  addClient(client: Client): Observable<ClientRecord> {
    return this.http
      .post<ClientRecord>(this.clientsUrl, client, this.httpOptions)
      .pipe(
        tap(newRecord => this.log(`added client id=${newRecord.name}`)),
        catchError(this.handleError<ClientRecord>('addClient')),
      );
  }

  /** PUT: update the client on the server */
  updateClient(client: Client): Observable<any> {
    return this.http.put(this.clientsUrl, client, this.httpOptions).pipe(
      tap(_ =>
        this.log(`updated client identification=${client.identification}`),
      ),
      catchError(this.handleError<any>('updateClient')),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ClientService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`ClientService: ${message}`);
    console.log('ClientService', message);
  }
}
