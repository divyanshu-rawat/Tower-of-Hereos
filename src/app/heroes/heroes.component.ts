import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import {MessageService} from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// @Component is a decorator function that specifies the Angular metadata for the component.

export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(response =>{ 

      this.messageService.add_message('HeroService: fetched heroes');
      this.heroes =  response;

    });
  }

  heroes: Hero[]

  selectedHero : Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };

}


