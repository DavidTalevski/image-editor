import Action from "../action";
import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import { ImageLoader } from "../../../loader/imageLoader";

/**
 * @typedef {import("./saturationActionData").SaturationActionData} SaturationActionConfig
 */

export default class SaturationAction extends Action {
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

        this.loader = new ImageLoader();
        this.isLoading = false;
    }

    async execute() {
        super.execute();

        if (this.isLoading) return;

        if (!this.image) {
            this.isLoading = true;
            this.image = await this.loader.loadFromUrl(this.canvas.getSaveData());
        }

        this.isLoading = false;

        this.canvas.drawImage(this.image);
        this.canvas.setSaturation(this.data.saturation);
    }

    destroy() {
        this.loader = null;
        this.image = null;

        super.destroy();
    }
}