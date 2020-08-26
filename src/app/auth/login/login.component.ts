import { AppState } from './../../app.reducer';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  isCargando: boolean
  subscription: Subscription
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe
  }

  ngOnInit(): void {
    this.subscription =
      this.store.select('ui')
        .subscribe(ui => {
          this.isCargando = ui.isLoading
        })
  }

  onLogin(data): void {
    this.authService.login(data.email, data.password)
  }
}
