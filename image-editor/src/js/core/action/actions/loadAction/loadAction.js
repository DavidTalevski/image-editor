import Action from "../action";
import { ImageLoader } from "../../../loader/imageLoader";
import ActionType from "../../../enum/actionType.enum";
import LoadImageActionType from "../../../enum/loadImageActionType.enum";

export default class LoadAction extends Action {
    /**
     * @type {import("./loadActionData").LoadActionData}
     */
    data;

    title = "Load Image"

    description = "";

    type = ActionType.LOAD;

    /**
     * @type {HTMLImageElement|null}
     */
    image = null;

    loader = new ImageLoader();

    async execute() {
        super.execute();

        return this.drawImage(this.data.loadImageActionType, this.data.imageData);
    }

    /**
     * @param {LoadImageActionType}
     * @param {string} data - Base64 data
     */
    async drawImage(actionType, data) {
        try {
            if (actionType == LoadImageActionType.UPLOAD) {
                this.image = await this.loader.loadFromBlob(data);
            } else if (actionType == LoadImageActionType.URL) {
                this.image = await this.loader.loadFromUrl(data);
            } else if (actionType == LoadImageActionType.CLIPBOARD) {
                this.image = await this.loader.loadFromClipboard();
            }
        } catch (e) {
            throw e;
        }

        this.canvas.drawImage(this.image);
    }

    getSaveData() {
        if (this.data.loadImageActionType != LoadImageActionType.URL) {
            this.data.loadImageActionType = LoadImageActionType.URL;
            this.data.imageData = this.imageToBase64(this.image);
        }
        return super.getSaveData();
    }

    imageToBase64(imgElement) {
        var canvas = document.createElement('canvas');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        canvas.getContext('2d').drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
        return canvas.toDataURL('image/png');
    }

    destroy() {
        this.loader = null;
        super.destroy();
    }
}