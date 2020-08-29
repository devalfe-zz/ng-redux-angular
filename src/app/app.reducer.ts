import * as reducerUI from "./shared/ui.reducer";
import * as reducerAuth from "./auth/auth.reducer";
import * as reducerIngresoEgreso from "./ingreso-egreso/ingreso-egreso.reducer";


import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  ui: reducerUI.State,
  auth: reducerAuth.AuthState,
  ingresoEgreso: reducerIngresoEgreso.IngresoEgresoState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: reducerUI.uiReducer,
  auth: reducerAuth.authReducer,
  ingresoEgreso: reducerIngresoEgreso.IngresoEgresoReducer
}
