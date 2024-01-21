import CanvasController from "../canvas/canvasController";
import ImageType from "../enum/imageType.enum";

export default class Downloader {

    /** @private */
    TAG = "[Image Downloader]";

    /**
     * @param {CanvasController} canvas
     * @param {string} fileName 
     * @param {(typeof ImageType)[keyof typeof ImageType]} type
     * @param {number} quality - For JPEG images, specify the quality (0 to 1)
     */
    downloadCanvas(canvas, fileName, type, quality = 1) {
        if (!fileName || fileName === "") fileName = "image";
        if (quality < 0 || quality > 1) quality = 1;

        const name = `${fileName}.${type}`;
        const image = canvas.getSaveData(type, quality);
        const link = document.createElement('a');

        link.href = image;
        link.download = name;

        console.log(this.TAG, "Downloading image:", name);
        link.click();
    }

    /**
     * @param {string} fileName
     * @param {string} data 
     */
    downloadProject(fileName, data) {
        if (!fileName || fileName === "") fileName = "project";
        const blob = new Blob([data], { type: 'application/json' });

        const link = document.createElement('a');

        link.download = `${fileName}.iep`;

        link.href = URL.createObjectURL(blob);

        console.log(this.TAG, "Downloading PROJECT:", `${fileName}.iep`);

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
}
