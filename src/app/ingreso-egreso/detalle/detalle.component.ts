import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  itemSubs: Subscription = new Subscription()

  items: IngresoEgreso[]
  constructor(
    private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService
  ) { }
  ngOnInit(): void {
    this.itemSubs = this.store.select('ingresoEgreso')
      .subscribe(data => {
        this.items = data.items
      })
  }
  ngOnDestroy(): void {
    this.itemSubs.unsubscribe()
  }
  borrarItem(item: IngresoEgreso) {

    this.ingresoEgresoService.eliminarItems(item.uid)
      .then(() => {
        Swal.fire('Eliminado', item.descripcion, 'success')
      })

  }
}
