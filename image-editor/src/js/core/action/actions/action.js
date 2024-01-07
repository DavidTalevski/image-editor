import CanvasController from "../../canvas/canvasController";
import ActionType from "../../enum/actionType.enum";
import structuredClone from "@ungap/structured-clone"

export default class Action {

    /** @type {ActionType} */
    type;

    title = "Title";

    description = "Description";

    /**
     * @param {CanvasController} canvas 
     * @param {any} data
     */
    constructor(canvas, data) {
        /** @protected */
        this.canvas = canvas;

        /** @protected */
        this.active = true;

        this.data = structuredClone(data);
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

    deactivate() {
        this.active = false;
    }

    destroy() {
        this.data = null;
        this.canvas = null;
    }
}