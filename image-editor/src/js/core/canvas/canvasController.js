import { ImageType } from "../enum/imageType.enum";

export default class CanvasController {

    /**
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        /** @private */
        this.canvas = canvas;

        /** @private */
        this.context = canvas.getContext('2d');
    }

    /**
     * @param {HTMLImageElement} image 
     */
    drawImage(image) {
        this.canvas.width = image.width;
        this.canvas.height = image.height;

        this.clear();
        this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * @param {(typeof ImageType)[keyof typeof ImageType]=} format
     * @param {number=} quality - For JPEG/WEBP images, specify the quality (0 to 1)
     * @returns {string}
     */
    getSaveData(format = ImageType.PNG, quality = 1) {
        return this.canvas.toDataURL(`image/${format}`, quality);
    }
}