import { IngresoEgreso } from './../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingreso: number
  egreso: number
  cuantosIngreso: number
  cuantosEgreso: number

  subs: Subscription = new Subscription()

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos']
  public doughnutChartData: number[] = []

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subs = this.store.select('ingresoEgreso')
      .subscribe(ie => {
        this.contarIngresoEgreso(ie.items)
      })
  }


  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingreso = 0
    this.egreso = 0

    this.cuantosEgreso = 0
    this.cuantosIngreso = 0

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngreso++
        this.ingreso += item.monto
      } else {
        this.cuantosEgreso++
        this.egreso += item.monto
      }
    })

    this.doughnutChartData = [this.ingreso, this.egreso]

  }
}
