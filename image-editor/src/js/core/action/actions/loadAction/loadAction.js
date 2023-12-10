import Action from "../action";
import { ImageLoader } from "../../../loader/imageLoader";
import ActionType from "../../../enum/actionType.enum";
import LoadImageActionType from "../../../enum/loadImageActionType.enum";
import CanvasController from "../../../canvas/canvasController";

export default class LoadAction extends Action {
    /**
     * @type {import("./loadActionData").LoadActionData}
     */
    data;

    type = ActionType.LOAD;

    /**
     * @param {CanvasController} canvas 
     * @param {LoadActionData} data 
     */
    constructor(canvas, data) {
        super(canvas, data);
        this.loader = new ImageLoader();
    }

    async execute() {
        super.execute();
        return this.drawImage(this.data.loadImageActionType, this.data.imageData);
    }

    /**
     * @param {LoadImageActionType}
     * @param {string} data - Base64 data
     */
    async drawImage(actionType, data) {
        let image;

        try {
            if (actionType == LoadImageActionType.UPLOAD) {
                image = await this.loader.loadFromBlob(data);
            } else if (actionType == LoadImageActionType.URL) {
                image = await this.loader.loadFromUrl(data);
            } else if (actionType == LoadImageActionType.CLIPBOARD) {
                image = await this.loader.loadFromClipboard();
            }
        } catch (e) {
            throw e;
        }

        this.canvas.drawImage(image);
    }
}