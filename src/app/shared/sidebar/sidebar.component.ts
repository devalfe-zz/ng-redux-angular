import { IngresoEgresoService } from './../../ingreso-egreso/ingreso-egreso.service';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  nombre: string
  subs: Subscription = new Subscription()
  constructor(
    public authService: AuthService,
    private store: Store<AppState>,
    public IngresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subs = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.nombre = auth.user.nombre
      })
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  onLogout() {
    this.authService.logout()
    this.IngresoEgresoService.cancelarSubs()
  }
}
