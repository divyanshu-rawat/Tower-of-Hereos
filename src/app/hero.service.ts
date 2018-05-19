import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.

export class HeroService {

  constructor(private http: HttpClient,private messageService: MessageService,){}

  private heroesUrl = 'api/heroes';
  
  private log(message: string) {
    this.messageService.add_message('HeroService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * atparam operation - name of the operation that failed
 * atparam result - optional value to return as the observable result
 */

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


  getHeroes() : Observable<Hero[]>{
  	// this.messageService.add_message('HeroService: fetched heroes');
  	// return of(HEROES);

    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log(`fetched heroes`))
      ,catchError(this.handleError('getHeroes', []))
     );
  }

/** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero:Hero):Observable<any>{
    this.http.put(this.heroesUrl,hero,httpOptions).pipe(tap(() => { log(`updated hero id=${hero.id}`) }),catchError(function(){}))
  }

}



 // You do this by registering a provider. A provider is something that can create or deliver a service; in this case,
 // it instantiates the HeroService class to provide the service.


 // Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.