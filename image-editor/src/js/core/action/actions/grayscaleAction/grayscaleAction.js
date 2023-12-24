import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FilterAction from "../filterAction";

/**
 * @typedef {import("./grayscaleActionData").GrayscaleActionData} GrayScaleActionConfig
 */

export default class GrayscaleAction extends FilterAction {
    /**
     * @type {GrayScaleActionConfig}
     */
    data;

    title = "Grayscale Filter"

    type = ActionType.GRAYSCALE;

    /**
     * @param {CanvasController} canvas 
     * @param {GrayScaleActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        await super.execute();

        this.description = `Set grayscale to ${this.data.grayscale}`

        this.canvas.setGrayscale(this.data.grayscale);
    }
}