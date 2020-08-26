import { User } from './auth.model';
import { Action } from "@ngrx/store";

export const SET_USER = '[Auth] Set User'

export class setUserActions implements Action {
  readonly type = SET_USER

  constructor(
    public user: User
  ) { }
}

export type acciones = setUserActions
