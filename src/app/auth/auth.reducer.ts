
import * as actionsAuth from "./auth.actions"
import { User } from "./auth.model";


export interface AuthState {
  user: User
}

const initState: AuthState = {
  user: null
}

export function authReducer(state = initState, action: actionsAuth.acciones): AuthState {

  switch (action.type) {
    case actionsAuth.SET_USER:
      return {
        user: { ...action.user }
      }

    default:
      return state
  }
}
