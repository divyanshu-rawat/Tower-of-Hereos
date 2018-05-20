import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import {MessageService} from '../message.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// @Component is a decorator function that specifies the Angular metadata for the component.

export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, private messageService: MessageService, private location:Location) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(response =>{ 

      this.messageService.add_message('HeroService: Fetched Heroes');
      this.heroes =  response;

    });
  }

  addHero():void{
    let name = this.data.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe( hero => {
        // this.goBack();
         this.heroes.push(hero);
    })
  }

  goBack():void{
    this.location.back();
  }

  data:string;

  heroes: Hero[]

}


