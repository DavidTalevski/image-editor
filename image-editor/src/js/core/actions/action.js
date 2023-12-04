import CanvasController from "../canvas/canvasController";
import ActionType from "../enum/actionType.enum";

export default class Action {

    /** @type {ActionType} */
    type;

    /**
     * @param {CanvasController} canvas 
     * @param {any} data
     */
    constructor(canvas, data) {
        /** @protected */
        this.canvas = canvas;

        /** @protected */
        this.active = false;

        /** @protected */
        this.data = data;
    }

    isActive() {
        return this.active;
    }

    async update(data) {
        this.data = data;
        return this.execute();
    }

    async execute() {
        this.active = true;
    }

    async undo() {
        this.active = false;
    }

    destroy() {
        this.data = null;
        this.canvas = null;
    }
}