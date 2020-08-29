
import { activarLoadingAction, desactivarLoadingAction } from './../shared/ui.actions';
import { User } from './auth.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { map } from "rxjs/operators";
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUserActions, unSetUserActions } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription()
  private usuario: User
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private DB: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.DB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe((obj: any) => {
          const newUser = new User(obj)
          this.store.dispatch(new setUserActions(newUser))
          this.usuario = newUser

        })
      } else {
        this.usuario = null
        this.userSubscription.unsubscribe()
      }

    })
  }

  crearUser(nombre, email, password) {
    this.store.dispatch(new activarLoadingAction)
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        }
        this.DB
          .doc(`${user.uid}/usuario`).set(user)
          .then(() => {
            this.router.navigate(['/'])
            this.store.dispatch(new desactivarLoadingAction)

          })


        this.router.navigate(['/'])

      })
      .catch(err => {
        this.store.dispatch(new desactivarLoadingAction)
        Swal.fire('Error Crear usuario', err.message, 'error')

      })
  }
  login(email, pass) {
    this.store.dispatch(new activarLoadingAction)

    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(resp => {
      this.store.dispatch(new desactivarLoadingAction)
      this.router.navigate(['/'])

    })
      .catch(err => {
        this.store.dispatch(new desactivarLoadingAction)
        Swal.fire('Error Login', err.message, 'error')
      })
  }

  logout() {
    this.afAuth.auth.signOut()
    this.router.navigate(['/login'])
    this.store.dispatch(new unSetUserActions())
  }
  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login'])
        }
        return fbUser != null
      })
    )
  }
  getUsuario() {
    return {
      ...this.usuario
    }
  }
}
