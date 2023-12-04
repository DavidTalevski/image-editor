import ActionRegistry from "./actionRegistry";
import ActionType from "../enum/actionType.enum";

import LoadAction from "./loadAction/loadAction";


export default function registerActions() {
    ActionRegistry.registerAction(ActionType.LOAD, LoadAction);
}