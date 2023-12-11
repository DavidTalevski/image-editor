import Action from "./action";
import CanvasController from "../../canvas/canvasController";
import { ImageLoader } from "../../loader/imageLoader";

export default class FilterAction extends Action {
    /**
     * @param {CanvasController} canvas 
     * @param {any} data 
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
    }

    destroy() {
        this.loader = null;
        this.image = null;

        super.destroy();
    }
}