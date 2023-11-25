import { ImageLoader } from "./loader/imageLoader";

export class ImageEditor {

    TAG = "[Image Editor]";

    constructor() {
        this.loader = new ImageLoader();
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    async loadAndShowImage(event) {
        const file = event.target.files[0];

        try {
            const image = await this.loader.load(file);
            this.drawImage(image);
        } catch (e) {
            console.log(this.TAG, e);
        }
    }

    drawImage(image) {
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.context.drawImage(image, 0, 0, image.width, image.height);
    }
}