import CanvasController from "../canvas/canvasController";
import ImageType from "../enum/imageType.enum";

export default class ImageDownloader {

    /** @private */
    TAG = "[Image Downloader]";

    /**
     * @param {CanvasController} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
    }

    /**
     * @param {string} fileName 
     * @param {(typeof ImageType)[keyof typeof ImageType]} type
     * @param {number} quality - For JPEG images, specify the quality (0 to 1)
     */
    download(fileName, type, quality = 1) {
        if (!fileName || fileName === "") fileName = "image";
        if (quality < 0 || quality > 1) quality = 1;

        const name = `${fileName}.${type}`;
        const image = this.canvas.getSaveData(type, quality)
        const link = document.createElement('a');

        link.href = image;
        link.download = name;

        console.log(this.TAG, "Downloading image:", name);
        link.click();
    }
}