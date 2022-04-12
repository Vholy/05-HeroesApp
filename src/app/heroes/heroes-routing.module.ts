import { NgModule } from '@angular/core';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';

const routes2 : Routes= [

  {
    path:'',
    component: HomeComponent,
    children: [
      {path:'listado', component:ListadoComponent },
      {path:'agregar', component:AgregarComponent },
      {path:'editar/:id', component:AgregarComponent },
      {path:'buscar', component:BuscarComponent },
      {path:':id', component:HeroeComponent },
      {path:'agregar', component:AgregarComponent },
      {path:'**', redirectTo:'listado'}
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild (routes2)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
