import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL : string= environment.baseUrl
  private _auth :Auth | undefined
  
  get auth(){
    return {... this._auth}
  }
  constructor(private http: HttpClient,
              
    ) { }

    verificarAutentificacion():Observable<boolean> {

      if (!localStorage.getItem('token')){
        return of(false)
        //return of(true)  2 maneras una con of otra modificando arriba
      }

      return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
      .pipe( 
        map(auth =>{ 
          console.log('map', auth);
          this._auth=auth
          return true;
        })
      );

   }

  login(){
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
      )
  }


}
