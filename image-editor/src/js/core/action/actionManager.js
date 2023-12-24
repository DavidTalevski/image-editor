import Action from "./actions/action";
import CanvasController from "../canvas/canvasController";
import EventEmitter from "eventemitter3"
import ActionManagerEvents from "./events/actionManagerEvents.enum";
import ActionFactory from "./actionFactory";

export default class ActionManager extends EventEmitter {

    /**
     * @type {Action[]}
     * @private
     */
    actionQueue = [];

    /** @private */
    TAG = "[Action Manager]";

    events = ActionManagerEvents;

    add = new ActionFactory(this);

    /**
     * Creates an instance of ActionManager.
     * @param {CanvasController} canvas - The canvas controller instance.
     */
    constructor(canvas) {
        super();
        this.canvas = canvas;
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
     * @param {Action} action 
     */
    addAction(action) {
        console.log(this.TAG, "Adding action");

        this.removeUnactiveActions();

        this.actionQueue.push(action);

        this.emit(this.events.ACTION_CREATED, action);
    }

    /**
     * @returns {Action}
     */
    getCurrentAction() {
        return this.actionQueue[this.actionQueue.length - 1];
    }

    removeUnactiveActions() {
        this.actionQueue = this.actionQueue.filter(action => action.isActive());
    }

    /**
     * Executes a specific action from the action queue.
     * @param {number} orderId - The order ID of the action to execute.
     * @returns {Promise} A promise that resolves when the action is executed.
     */
    async executeAction(orderId) {
        const action = this.actionQueue[orderId];

        if (!action) return;

        console.log(this.TAG, "Executing action with id:", orderId);
        await action.execute();

        this.emit(this.events.ACTION_EXECUTED, action, orderId);
    }

    /**
     * @param {Action} action 
     * @param {any} data 
     */
    async updateAction(action, data) {
        await action.update(data);

        this.emit(this.events.ACTION_UPDATED, action);
    }

    /**
     * Executes all actions between two order IDs (inclusive).
     * Deactivates all other actions.
     * @param {number} startOrderId - The starting order ID.
     * @param {number} endOrderId - The ending order ID.
     */
    async executeAllActionsBetween(startOrderId, endOrderId) {
        console.log(this.TAG, `Executing actions between ${startOrderId} and ${endOrderId}`);
        for (let i = 0; i < this.actionQueue.length; i++) {
            const action = this.actionQueue[i];

            if (i >= startOrderId && i <= endOrderId) {
                // Execute the action within the specified range
                await this.executeAction(i);
            } else {
                // Deactivate actions outside the specified range
                action.deactivate();
            }
        }

        this.emit(this.events.MULTIPLE_ACTIONS_EXECUTED);
    }
}
