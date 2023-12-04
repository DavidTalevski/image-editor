import CanvasController from "../canvas/canvasController";

export default class Action {

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

    async execute() {
        this.active = true;
    }

    async undo() {
        this.active = false;
    }
}