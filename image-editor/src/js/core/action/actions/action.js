import CanvasController from "../../canvas/canvasController";
import ActionType from "../../enum/actionType.enum";
import structuredClone from "@ungap/structured-clone";

export default class Action {

    /** @type {ActionType} */
    type;

    title = "Title";

    description = "Description";

    /** @protected */
    active = true;

    /**
     * @param {CanvasController} canvas 
     * @param {any} data
     */
    constructor(canvas, data) {
        /** @protected */
        this.canvas = canvas;

        this.data = structuredClone(data);
    }

    isActive() {
        return this.active;
    }

    async update(data) {
        this.data = structuredClone(data);
        return this.execute();
    }

    async execute() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    getSaveData() {
        return {
            type: this.type,
            data: this.data,
            description: this.description
        }
    }

    destroy() {
        this.data = null;
        this.canvas = null;
    }

}
