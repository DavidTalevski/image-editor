import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./brightnessActionData").BrightnessActionData} BrightnessActionConfig
 */

export default class BrightnessAction extends FilterAction {
    /**
     * @type {BrightnessActionConfig}
     */
    data;

    title = "Brightness Filter";

    type = ActionType.BRIGHTNESS;

    /**
     * @param {CanvasController} canvas 
     * @param {BrightnessActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.description = `Set brightness to ${this.data.brightness}`;

        this.canvas.setBrightness(this.data.brightness);
    }
}