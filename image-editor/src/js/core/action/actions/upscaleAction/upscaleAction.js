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

    type = ActionType.UPSCALE;

    loader = new ImageLoader();

    async execute() {
        super.execute();

        // Get the base64-encoded image data from the canvas
        const imageData = this.canvas.getSaveData("jpeg").replace(/^data:image\/jpeg;base64,/, '');

        const md5 = this.data.MD5Hash;
        const data = { image: imageData, MD5Hash: md5 }

        this.description = `Hash: ${md5}`;

        try {

            const response = await axios({
                url: this.data.URL,
                responseType: "arraybuffer",
                method: "post",
                data: data
                // timeout: 10000,
                // onDownloadProgress: progressCallback
            });

            // const response = await axios.post(this.data.URL, data);
            return this.drawImage(response.data);
        } catch (e) {
            throw e;
        }
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