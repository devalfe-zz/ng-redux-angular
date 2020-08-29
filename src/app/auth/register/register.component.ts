import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  isCargando: boolean
  subscription: Subscription = new Subscription()


  constructor(
    private authService: AuthService,
    public store: Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription = this.store.select('ui')
      .subscribe(ui => {
        this.isCargando = ui.isLoading
      })
  }

  onSumit(user): void {

    this.authService.crearUser(user.nombre, user.correo, user.password)

  }

}
