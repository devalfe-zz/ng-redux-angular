import { Action } from "@ngrx/store";

export const ACTIVAR_LOADING = '[UI Loading] Cargando...'
export const DESACTIVAR_LOADING = '[UI Loading] fin de carga...'

export class activarLoadingAction implements Action {
  readonly type = ACTIVAR_LOADING
}

export class desactivarLoadingAction implements Action {
  readonly type = DESACTIVAR_LOADING
}

export type acciones = activarLoadingAction | desactivarLoadingAction
