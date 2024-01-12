import ActionManager from "../core/action/actionManager";
import CanvasController from "../core/canvas/canvasController";
import { ImageLoader } from "../core/loader/imageLoader";

export default class CropActionHandler {

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

        /** @private */
        this.box = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    }

    createAction = () => {
        const action = this.actionManager.add.cropAction(this.box);

        this.actionManager.updateAction(action, this.box);
    };

    saveCrop = () => {
        if (this.box.width <= 0 || this.box.height <= 0) return;

        this.createAction();
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    updateBox = (x, y, w, h) => {
        this.box.x = x;
        this.box.y = y;
        this.box.width = w;
        this.box.height = h
    }

}
