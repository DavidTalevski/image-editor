import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./sepiaActionData").SepiaActionData} SepiaActionConfig
 */

export default class SepiaAction extends FilterAction {
    /**
     * @type {SepiaActionConfig}
     */
    data;

    type = ActionType.SEPIA;

    /**
     * @param {CanvasController} canvas 
     * @param {SepiaActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.canvas.setSepia(this.data.sepia);
    }
}