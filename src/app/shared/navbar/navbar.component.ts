import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string
  subs: Subscription = new Subscription()
  constructor(
    private store: Store<AppState>
  ) { }


  ngOnInit(): void {
    this.subs = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.nombre = auth.user.nombre
        console.log(auth.user.nombre);

      })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
