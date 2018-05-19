
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
// import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private HeroService: HeroService, private location: Location, private route:ActivatedRoute) { }

  ngOnInit(){
  	this.getHero()
  }

  getHero(): void{
  	const _id = +this.route.snapshot.paramMap.get('id');
  	this.HeroService.getHero(_id).subscribe( response => {
  		this.hero = response;
  	})
  }

  save():void{
    this.HeroService.updateHero(this.hero).subscribe(=>{
      this.goBack();
    })
  }

  goBack(): void {
    this.location.back();
  }

  hero: Hero

}

// That's the only change you should make to the HeroDetailComponent class. There are no more properties. There's no presentation logic.
// This component simply receives a hero object through its hero property and displays it