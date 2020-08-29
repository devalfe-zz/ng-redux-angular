import { IngresoEgreso } from './ingreso-egreso.model';
import * as actionsIngresoEgreso from "./ingreso-egreso.actions"

export interface IngresoEgresoState {
  items: IngresoEgreso[]
}

const initState: IngresoEgresoState = {
  items: []
}

export function IngresoEgresoReducer(state = initState, action: actionsIngresoEgreso.acciones): IngresoEgresoState {

  switch (action.type) {
    case actionsIngresoEgreso.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return {
              ...item
            }
          })
        ]
      }
    case actionsIngresoEgreso.UNSET_ITEMS:
      return {
        items: []
      }

    default:
      return state
  }

}
