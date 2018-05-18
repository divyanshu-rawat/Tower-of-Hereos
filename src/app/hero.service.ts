import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})

// The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.

export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes() : Observable<Hero[]>{
  	// this.messageService.add_message('HeroService: fetched heroes');
  	return of(HEROES);
  }
}



 // You do this by registering a provider. A provider is something that can create or deliver a service; in this case,
 // it instantiates the HeroService class to provide the service.


 // Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.