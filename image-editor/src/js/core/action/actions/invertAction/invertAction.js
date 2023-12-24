import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./invertActionData").InvertActionData} InvertActionConfig
 */

export default class InvertAction extends FilterAction {
    /**
     * @type {InvertActionConfig}
     */
    data;

    title = "Invert Filter";

    type = ActionType.INVERT;

    /**
     * @param {CanvasController} canvas 
     * @param {InvertActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.description = `Set invert to ${this.data.invert}`;

        this.canvas.setInvert(this.data.invert);
    }
}