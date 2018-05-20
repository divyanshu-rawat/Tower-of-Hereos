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

 private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

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

    return this.http.put(this.heroesUrl,hero,this.httpOptions)
    .pipe(
       tap(() => { this.log(`updated hero id=${hero.id}`) })
      ,catchError(this.handleError<any>('updateHero'))
      )
  }

 /** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {


  console.log("chuchu", hero);
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
delHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}



 // You do this by registering a provider. A provider is something that can create or deliver a service; in this case,
 // it instantiates the HeroService class to provide the service.


 // Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.