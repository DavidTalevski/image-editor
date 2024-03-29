import Action from "./actions/action";
import CanvasController from "../canvas/canvasController";
import EventEmitter from "eventemitter3"
import ActionManagerEvents from "./events/actionManagerEvents.enum";
import ActionFactory from "./actionFactory";
import ActionType from "../enum/actionType.enum";
import ActionRegistryManager from "./registry/actionRegistryManager";

export default class ActionManager extends EventEmitter {

    /**
     * @type {Action[]}
     */
    actionQueue = [];

    /** @private */
    TAG = "[Action Manager]";

    events = ActionManagerEvents;

    add = new ActionFactory(this);

    registry = new ActionRegistryManager();

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
        this.actionQueue.forEach(action => action.canvas = canvas)
    }

    /**
     * Loads saved actions into the action queue.
     * @param {import("./actions/actionSaveData").ActionSaveData[]} savedActions - The saved actions to load.
     */
    loadSavedActions(savedActions) {
        console.log(this.TAG, "Loading saved actions", savedActions);

        savedActions.forEach((savedAction) => {
            this.add.createActionFromSaveData(savedAction);
        });
    }

    /**
     * @param {Action} action 
     */
    addAction(action) {
        console.log(this.TAG, "Adding action");

        this.removeInactiveActions();

        this.actionQueue.push(action);

        this.emit(this.events.ACTION_CREATED, action);
    }

    /**
     * @returns {Action}
     */
    getCurrentAction() {
        return this.actionQueue[this.actionQueue.length - 1];
    }

    removeInactiveActions() {
        for (let i = this.actionQueue.length - 1; i >= 0; i--) {
            const currentAction = this.actionQueue[i];

            if (!currentAction.isActive()) this.removeAction(i);
        }
    }

    /**
     * Removes an action from the action queue based on its order ID.
     * Calls the destroy function before removing the action.
     * @param {number} orderId - The order ID of the action to remove.
     */
    removeAction(orderId) {
        console.log(this.TAG, "Removing action with id:", orderId);

        const removedAction = this.actionQueue.splice(orderId, 1)[0];

        if (removedAction) {
            removedAction.destroy();

            this.emit(this.events.ACTION_REMOVED, removedAction, orderId);
        }
    }

    /**
     * Removes the last added action from the action queue.
     * Calls the destroy function for the removed action.
     */
    removeLastAction() {
        const lastActionIndex = this.actionQueue.length - 1;
        this.removeAction(lastActionIndex);
    }

    /**
     * Removes all actions from the action queue.
     * Calls the destroy function for each removed action.
     */
    removeAllActions() {
        while (this.actionQueue.length > 0) {
            const lastActionIndex = this.actionQueue.length - 1;
            this.removeAction(lastActionIndex);
        }
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
        this.emit(this.events.ACTION_UPDATE_EXECUTED, action);

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
        if (this.actionQueue.length == 0) return;

        console.log(this.TAG, `Executing actions between ${startOrderId} and ${endOrderId}`);
        this.emit(this.events.MULTIPLE_ACTIONS_STARTED);

        const lastLoadingAction = this.getLastLoadingAction(startOrderId, endOrderId);
        const startId = lastLoadingAction == -1 ? startOrderId : lastLoadingAction;


        for (let i = 0; i < this.actionQueue.length; i++) {
            const action = this.actionQueue[i];

            if (i >= startId && i <= endOrderId) {
                // Execute the action within the specified range
                await this.executeAction(i);
            } else {
                // Deactivate actions outside the specified range
                action.deactivate();
            }
        }

        console.log(this.TAG, `Executed actions between ${startId} and ${endOrderId}`);

        this.emit(this.events.MULTIPLE_ACTIONS_EXECUTED);
    }

    /**
     * @param {number} startOrderId - The starting order ID.
     * @param {number} endOrderId - The ending order ID.
     * @returns {number} - The index of the last loading action.
     */
    getLastLoadingAction(startOrderId, endOrderId) {
        for (let i = endOrderId; i >= startOrderId; i--) {
            const action = this.actionQueue[i];

            if (action.type === ActionType.LOAD ||
                action.type === ActionType.UPSCALE) {
                return i;
            }
        }

        return -1;
    }

    getActionSaveData() {
        return this.actionQueue.map(action => action.getSaveData());
    }
}
