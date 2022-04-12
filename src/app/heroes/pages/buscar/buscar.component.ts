import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: string= "";
  heroes: Heroe[]  = [];
  heroeSeleccionado! : Heroe| undefined
  heroeID: string = ""

    
  buscando(){
  this.HeroesService.getSugerencias(this.termino.trim() )
  .subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

    if(!event.option.value){
      this.heroeSeleccionado = undefined
    }

    const heroe:Heroe = event.option.value
    this.termino= heroe.superhero
    this.heroeID= heroe.id
  }














  constructor(private HeroesService:HeroesService) { }
  ngOnInit(): void {
  }
}
