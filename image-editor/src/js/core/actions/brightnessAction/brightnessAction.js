import Action from "../action";
import ActionType from "../../enum/actionType.enum";
import CanvasController from "../../canvas/canvasController";
import { ImageLoader } from "../../loader/imageLoader";

/**
 * @typedef {import("./brightnessActionData").BrightnessActionData} BrightnessActionConfig
 */

export default class BrightnessAction extends Action {
    /**
     * @type {BrightnessActionConfig}
     */
    data;

    type = ActionType.BRIGHTNESS;

    /**
     * @param {CanvasController} canvas 
     * @param {BrightnessActionConfig} data 
     */
    constructor(canvas, data) {
        super(canvas, data);

        this.loader = new ImageLoader();
        this.isLoading = false;
    }

    async execute() {
        super.execute();

        if (this.isLoading) return;

        if (!this.image) {
            this.isLoading = true;
            this.image = await this.loader.loadFromUrl(this.data.canvasData);
        }

        this.isLoading = false;

        this.canvas.drawImage(this.image);
        this.canvas.setBrightness(this.data.brightness);
    }

    async undo() {
        super.undo();

        this.canvas.setBrightness(this.data.previousBrightness);
    }

    destroy() {
        this.loader = null;
        this.image = null;

        super.destroy();
    }
}