import { User } from './auth.model';
import { Action } from "@ngrx/store";

export const SET_USER = '[Auth] Set User'
export const UNSET_USER = '[Auth] Unset User'


export class setUserActions implements Action {
  readonly type = SET_USER

  constructor(
    public user: User
  ) { }
}

export class unSetUserActions implements Action {
  readonly type = UNSET_USER

}
export type acciones = setUserActions | unSetUserActions
