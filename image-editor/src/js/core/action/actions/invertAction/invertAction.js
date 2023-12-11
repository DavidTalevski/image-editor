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

        this.canvas.setInvert(this.data.invert);
    }
}