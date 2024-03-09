import Action from "../action";
import { ImageLoader } from "../../../loader/imageLoader";
import ActionType from "../../../enum/actionType.enum";
import axios from "axios"

export default class UpscaleAction extends Action {
    /**
     * @type {import("./upscaleActionData").UpscaleActionData}
     */
    data;

    title = "Upscale Image"

    description = "Upscaling..."

    type = ActionType.UPSCALE;

    loader = new ImageLoader();

    async execute() {
        super.execute();

        // Get the base64-encoded image data from the canvas
        const regExp = /^data:image\/jpeg;base64,/;
        const canvasData = this.canvas.getSaveData("jpeg");
        const imageData = canvasData.replace(regExp, '');

        const md5 = this.data.MD5Hash;
        const upscaleSettings = this.data.settings;
        const data = {
            image: imageData,
            settings: upscaleSettings,
            MD5Hash: md5
        }

        this.description = `Hash: ${md5}`;

        const response = await axios({
            url: this.data.URL,
            responseType: "arraybuffer",
            method: "post",
            data: data
        });

        return this.drawImage(response.data);
    }

    /**
     * @param {ArrayBuffer} data
     */
    async drawImage(data) {
        let image
        let blob = new Blob([data]);

        try {
            image = await this.loader.loadFromBlob(blob);
        } catch (e) {
            throw e;
        }

        this.canvas.drawImage(image);
    }

    destroy() {
        this.loader = null;
        super.destroy();
    }
}