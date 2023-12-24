import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./blurActionData").BlurActionData} BlurActionConfig
 */

export default class BlurAction extends FilterAction {
    /**
     * @type {BlurActionConfig}
     */
    data;

    title = "Blur Filter";

    type = ActionType.BLUR;

    /**
     * @param {CanvasController} canvas 
     * @param {BlurActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.description = `Set blur to ${this.data.blur}`;

        this.canvas.setBlur(this.data.blur);
    }
}