import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./saturationActionData").SaturationActionData} SaturationActionConfig
 */

export default class SaturationAction extends FilterAction {
    /**
     * @type {SaturationActionConfig}
     */
    data;

    type = ActionType.SATURATION;

    /**
     * @param {CanvasController} canvas 
     * @param {SaturationActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.canvas.setSaturation(this.data.saturation);
    }
}