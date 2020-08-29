import { setItemsAction, unSetItemsAction } from './ingreso-egreso.actions';
import { AuthService } from './../auth/auth.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  IngresoEgresoListenerSubs: Subscription = new Subscription()
  onItemsSubs: Subscription = new Subscription()


  constructor(
    private DB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const user = this.authService.getUsuario()

    return this.DB.doc(`${user.uid}/ingreso-egreso`)
      .collection('items').add({
        ...ingresoEgreso
      })
  }

  eliminarItems(uid: string) {
    const user = this.authService.getUsuario()

    return this.DB.doc(`${user.uid}/ingreso-egreso/items/${uid}`)
      .delete()

  }

  initIngresoEgresoListener() {
    this.IngresoEgresoListenerSubs = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(
        auth => {
          this.onItems(auth.user.uid)
        }
      )

  }

  private onItems(uid: string) {
    this.onItemsSubs = this.DB.collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map((doc: any) => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      )
      .subscribe((coleccion: IngresoEgreso[]) => {
        this.store.dispatch(new setItemsAction(coleccion))

      })
  }

  cancelarSubs() {
    this.IngresoEgresoListenerSubs.unsubscribe()
    this.onItemsSubs.unsubscribe()
    this.store.dispatch(new unSetItemsAction())
  }


}
