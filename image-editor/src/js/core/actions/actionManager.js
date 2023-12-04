import Action from "./action";
import ActionType from "../enum/actionType.enum";
import CanvasController from "../canvas/canvasController";
import ActionRegistry from "./actionRegistry";
import registerActions from "./registerActions";

export default class ActionManager {

    /**
     * @type {Action[]}
     * @private
     */
    actionQueue = [];

    /** @private */
    TAG = "[Action Manager]";

    /**
     * Creates an instance of ActionManager.
     * @param {CanvasController} canvas - The canvas controller instance.
     */
    constructor(canvas) {
        /** @private */
        this.canvas = canvas;

        registerActions();
    }
    /**
     * @param {CanvasController} canvas - The canvas controller instance
     */
    setCanvas(canvas) {
        this.canvas = canvas;
    }

    /**
     * Loads saved actions into the action queue.
     * // TODO JSDOC FOR SAVED ACTIONS
     * @param {any} savedActions - The saved actions to load.
     */
    loadSavedActions(savedActions) {
        console.log(this.TAG, "Loading saved actions", savedActions);

        savedActions.forEach((savedAction) => {
            this.createAction(savedAction.actionId, savedAction.data);
        });;
    }

    /**
     * Creates an action and adds it to the action queue.
     * @param {ActionType} actionId - The type of action to create.
     * @param {any} data - Additional data for the action.
     */
    createAction(actionId, data) {
        console.log(this.TAG, "Creating action with id:", actionId);
        const action = ActionRegistry.getActionInstance(actionId, this.canvas, data);

        this.actionQueue.push(action);

        return action;
    }

    getCurrentAction() {
        return this.actionQueue[this.actionQueue.length - 1];
    }

    /**
     * Executes a specific action from the action queue.
     * @param {number} orderId - The order ID of the action to execute.
     * @returns {Promise} A promise that resolves when the action is executed.
     */
    async executeAction(orderId) {
        const action = this.actionQueue[orderId];

        if (!action || action.isActive) return;

        console.log(this.TAG, "Executing action with id:", orderId);
        return action.execute();
    }

    /**
     * Undoes a specific action from the action queue.
     * @param {number} orderId - The order ID of the action to undo.
     * @returns {Promise} A promise that resolves when the action is undone.
     */
    async undoAction(orderId) {
        const action = this.actionQueue[orderId];

        if (!action || !action.isActive) return;

        console.log(this.TAG, "Undoing action with id:", orderId);
        return action.undo();
    }

    /**
     * Executes all actions between two order IDs (inclusive).
     * @param {number} startOrderId - The starting order ID.
     * @param {number} endOrderId - The ending order ID.
     */
    async executeAllActionsBetween(startOrderId, endOrderId) {
        console.log(this.TAG, `Executing actions between ${startOrderId} and ${endOrderId}`);
        for (let i = startOrderId; i <= endOrderId; i++) {
            await this.executeAction(i);
        }
    }

    /**
     * Undoes all actions between two order IDs (inclusive).
     * @param {number} startOrderId - The starting order ID.
     * @param {number} endOrderId - The ending order ID.
     */
    async undoAllActionsBetween(startOrderId, endOrderId) {
        console.log(this.TAG, `Undoing actions between ${startOrderId} and ${endOrderId}`);
        for (let i = endOrderId; i >= startOrderId; i--) {
            await this.undoAction(i);
        }
    }
}
