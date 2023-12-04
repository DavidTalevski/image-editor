import CanvasController from "../canvas/canvasController";
import ActionType from "../enum/actionType.enum";
import Action from "./action";

/**
 * @typedef {Object} ActionRegistryEntry
 * @property {ActionType} actionId - The identifier for the action type.
 * @property {typeof Action} actionClass - The constructor function (class) for the action.
 */

export default class ActionRegistry {

    /**
     * @private
     * @type {ActionRegistryEntry[]}
     */
    static registry = [];

    /** @private */
    static TAG = "[ActionRegistry]";

    /**
     * Registers an action in the registry.
     * @param {ActionType} actionId - The identifier for the action type.
     * @param {typeof Action} actionClass - The constructor function (class) for the action.
     */
    static registerAction(actionId, actionClass) {
        console.log(this.TAG, "Registering action:", actionId);

        if (this.registry.find(entry => entry.actionId === actionId)) return;
        this.registry.push({ actionId, actionClass });
    }

    /**
     * Unregisters an action from the registry based on its actionId.
     * @param {ActionType} actionId - The identifier for the action type to unregister.
     */
    static unregisterAction(actionId) {
        console.log(this.TAG, "Unregistering action:", actionId)

        this.registry = this.registry.filter(entry => entry.actionId !== actionId);
    }

    /**
     * Gets an instance of the specified action type from the registry.
     * @param {ActionType} actionId - The identifier for the action type.
     * @param {CanvasController} canvas - The reference to the canvas.
     * @param {any} data - Data to be passed to the action instance.
     * @returns {Action|null} - An instance of the action class, or null if not found.
     */
    static getActionInstance(actionId, canvas, data) {
        console.log(this.TAG, "Getting instance of action:", actionId)

        const entry = this.registry.find(entry => entry.actionId === actionId);

        if (!entry) return;

        const ActionClass = entry.actionClass;
        return new ActionClass(canvas, data);
    }
}