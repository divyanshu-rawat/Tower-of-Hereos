
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
// import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() hero: Hero;
}

// That's the only change you should make to the HeroDetailComponent class. There are no more properties. There's no presentation logic.
// This component simply receives a hero object through its hero property and displays it