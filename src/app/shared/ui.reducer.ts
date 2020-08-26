import * as actionsUI from "./ui.actions";

export interface State {
  isLoading: boolean
}

const initState: State = {
  isLoading: false
}

export function uiReducer(state = initState, action: actionsUI.acciones) {

  switch (action.type) {
    case actionsUI.ACTIVAR_LOADING:
      return {
        isLoading: true
      }
    case actionsUI.DESACTIVAR_LOADING:
      return {
        isLoading: false
      }
    default:
      return state;
  }

}
