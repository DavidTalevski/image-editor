import ActionRegistry from "./actionRegistry";

export default class ActionRegistryManager {

    /** @private */
    registry = ActionRegistry;

    getActionClass(id) {
        const action = this.registry.find(a => a.type === id);

        if (!action) return;

        return action.class;
    }
}