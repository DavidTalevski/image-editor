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
        switch (actionType) {
            case LoadImageActionType.UPLOAD:
                this.image = await this.loader.loadFromBlob(data);
                break;
            case LoadImageActionType.URL:
                this.image = await this.loader.loadFromUrl(data);
                break;
            case LoadImageActionType.BASE64:
                this.image = await this.loader.loadFromUrl(data);
                break;
            case LoadImageActionType.CLIPBOARD:
                this.image = await this.loader.loadFromClipboard();
                break;
            default:
                throw new Error('Invalid actionType');
        }

        this.canvas.drawImage(this.image);

        // Ensures that the image gets saved even if the clipboard changes 
        // or the provided url for the image does not exist anymore 
        // or it cannot be accessed. The image will be saved when
        // reversing actions in history or saving the project.
        if (this.data.loadImageActionType !== LoadImageActionType.BASE64) {
            this.data.loadImageActionType = LoadImageActionType.BASE64;
            this.data.imageData = this.imageToBase64(this.image);
        }
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