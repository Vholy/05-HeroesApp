import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }
  `
  ] 
})
export class AgregarComponent implements OnInit {
  publishers=[
    {
      id: 'DC Comics',
      desc:' DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc:' Marvel - Comics'
    }
  ];
  heroe: Heroe = {
    id: '',
    superhero: '',
    characters:'',
    publisher :Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    alt_img: '',   
   }

  constructor(private heroeService:HeroesService,
              private ActivatedRoute:ActivatedRoute, 
              private router:Router,
              private snackbar:MatSnackBar,
              public dialog: MatDialog ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')){
      return;
    }

    this.ActivatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroeService.getHeroesId(id) )
    )
      .subscribe( heroe => this.heroe = heroe)

  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0){
      return console.log('No se ha Actualizado/Guardado');
      
    }
     if (this.heroe.id){
       //Actualizar
       this.heroeService.actualizarHeroe(this.heroe)
        .subscribe (heroe =>  { this.router.navigate(['/heroes/listado']), this.mostrarSnackbar('Heroe Actualizado');
      })
      }
        //Crear
        else {
          this.heroeService.agregarHeroe(this.heroe)
            .subscribe( heroe => { this.router.navigate(['/heroes/editar', heroe.id]), this.mostrarSnackbar('Heroe Creado') } )
         }
  }

  borrar(){
    const dialogRef = this.dialog.open(ConfirmarComponent,{data:this.heroe} );
    dialogRef.afterClosed()
    .subscribe(result => {console.log(`Dialog result:`, result); 
      if (result) {
        console.log('Personaje Eliminado');
        
        this.heroeService.borrarHeroe(this.heroe.id)
        .subscribe( heroe => { this.router.navigate(['/heroes/listado']), console.log('Heroe Borrado'), this.mostrarSnackbar('Heroe Borrado');
      } )
      
    } else { return this.mostrarSnackbar('Heroe no Borrado') }
    });
      

    

    
  }
  mostrarSnackbar(mensaje:string){
    this.snackbar.open(mensaje, 'ok!',{
      duration:2500
    } )
  }

}
