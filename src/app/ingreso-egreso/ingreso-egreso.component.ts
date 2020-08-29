import { activarLoadingAction, desactivarLoadingAction } from './../shared/ui.actions';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoService } from "./ingreso-egreso.service";

import Swal from 'sweetalert2'
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup
  tipo: string = 'ingreso'

  loadingSubs: Subscription = new Subscription()
  isLoading: boolean
  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading
    })
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    })
  }
  crearIngreso() {
    this.store.dispatch(new activarLoadingAction())
    const ingresoegreso = new IngresoEgreso({
      ...this.form.value,
      tipo: this.tipo
    })

    this.ingresoEgresoService.crearIngresoEgreso(ingresoegreso)
      .then(() => {
        this.store.dispatch(new desactivarLoadingAction())
        Swal.fire('Creado ', ingresoegreso.descripcion, 'success')
        this.form.reset({
          monto: 0
        })
      })



  }
}
