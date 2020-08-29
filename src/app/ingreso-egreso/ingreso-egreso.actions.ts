import { IngresoEgreso } from './ingreso-egreso.model';
import { Action } from '@ngrx/store';

export const SET_ITEMS = '[Ingreso Egreso] Set Items'
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items'


export class setItemsAction implements Action {
  readonly type = SET_ITEMS
  constructor(
    public items: IngresoEgreso[]
  ) { }

}

export class unSetItemsAction implements Action {
  readonly type = UNSET_ITEMS

}


export type acciones = setItemsAction | unSetItemsAction
