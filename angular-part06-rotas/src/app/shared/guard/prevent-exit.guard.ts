import {CanDeactivateFn} from "@angular/router";
import {IformCanDeactivate} from "../interface/iform-can-deactivate";


export const FORM_DEACTIVATE_FN: CanDeactivateFn<IformCanDeactivate> =
  (component, route, state, nextState) => {

    return component.canDeactivate();
  }
