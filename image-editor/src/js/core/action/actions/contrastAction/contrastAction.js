import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./contrastActionData").ContrastActionData} ContrastActionConfig
 */

export default class ContrastAction extends FilterAction {
    /**
     * @type {ContrastActionConfig}
     */
    data;

    title = "Contrast Filter";

    type = ActionType.CONTRAST;

    /**
     * @param {CanvasController} canvas 
     * @param {ContrastActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.description = `Set contrast to ${this.data.contrast}`;

        this.canvas.setContrast(this.data.contrast);
    }
}