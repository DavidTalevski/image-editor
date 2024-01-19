import ActionManager from "../core/action/actionManager";
import CanvasController from "../core/canvas/canvasController";
import { ImageLoader } from "../core/loader/imageLoader";

export default class ResizeActionHandler {

    /**
     * @param {ActionManager} actionManager 
     * @param {CanvasController} canvas 
     */
    constructor(actionManager, canvas) {
        /** @private */
        this.actionManager = actionManager;

        /** @private */
        this.canvas = canvas;

        /** @private */
        this.loader = new ImageLoader();

        /** @private */
        this.image = null;
    }

    enterResizeMode = async () => {
        try {
            // toDataUrl isnt async so it blocks rendering
            const saveData = await this.canvas.getDataAsBlob();

            if (!saveData) {
                return;
            }

            this.image = await this.loader.loadFromBlob(saveData);
        } catch (e) {
            console.log(e);
        }
    }

    cancelResizeMode = () => {
        if (!this.image) return;

        this.canvas.drawImage(this.image);
        this.image = null;
    }

    createAction = () => {
        const data = {
            width: this.canvas.getClientWidth(),
            height: this.canvas.getClientHeight(),
        };

        this.actionManager.add.resizeAction(data);

        // Don't execute it since we already resized the canvas
    };

    saveResize = () => {
        this.image = null;
        this.createAction();
    }

    handleResize = async (width, height) => {
        if (!this.image) await this.enterResizeMode();

        this.canvas.drawImage(this.image, width, height);
    }
}
