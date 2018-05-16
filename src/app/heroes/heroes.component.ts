import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// @Component is a decorator function that specifies the Angular metadata for the component.

export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  hero : Hero = {
  	id : 1,
  	name : 'divyanshu'
  };

}


