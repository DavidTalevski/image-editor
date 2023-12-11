import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./hueRotationActionData").HueRotationActionData} HueRotationActionConfig
 */

export default class HueRotationAction extends FilterAction {
    /**
     * @type {HueRotationActionConfig}
     */
    data;

    type = ActionType.HUE_ROTATION;

    /**
     * @param {CanvasController} canvas 
     * @param {HueRotationActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.canvas.setHueRotation(this.data.hueRotationDegrees);
    }
}