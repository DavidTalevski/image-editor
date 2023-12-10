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
        this.actionQueue.push(action);

        this.emit(this.events.ACTION_CREATED, action);
    }

    /**
     * @returns {Action}
     */
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
