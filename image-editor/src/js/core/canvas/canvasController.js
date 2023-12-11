import { ImageType } from "../enum/imageType.enum";
import CanvasFilterManager from "./canvasFilterManager";

export default class CanvasController {

    /**
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        /** @private */
        this.canvas = canvas;

        /** @private */
        this.context = canvas.getContext('2d');

        this.filter = new CanvasFilterManager();
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

    redraw() {
        this.context.drawImage(this.canvas, 0, 0);
    }

    /**
     * @param {number} brightness 
     */
    setBrightness(brightness) {
        this.filter.addOrUpdateFilter("brightness", `${brightness}%`);
        this.applyFilters();
    }

    /**
     * @param {contrast} brightness 
     */
    setContrast(contrast) {
        this.filter.addOrUpdateFilter("contrast", `${contrast}%`);
        this.applyFilters();
    }

    /**
     * @param {number} grayscale 
     */
    setGrayscale(grayscale) {
        this.filter.addOrUpdateFilter("grayscale", `${grayscale}%`);
        this.applyFilters();
    }

    /**
     * @param {saturation} brightness 
     */
    setSaturation(saturation) {
        this.filter.addOrUpdateFilter("saturate", `${saturation}%`);
        this.applyFilters();
    }

    /**
     * @param {number} hueRotationDegrees 
     */
    setHueRotation(hueRotationDegrees) {
        this.filter.addOrUpdateFilter("hue-rotate", `${hueRotationDegrees}deg`);
        this.applyFilters();
    }

    /**
     * @param {number} invert 
     */
    setInvert(invert) {
        this.filter.addOrUpdateFilter("invert", `${invert}%`);
        this.applyFilters();
    }

    /**
     * @param {number} blur 
     */
    setBlur(blur) {
        this.filter.addOrUpdateFilter("blur", `${blur}px`);
        this.applyFilters();
    }

    /**
     * @param {number} sepia 
     */
    setSepia(sepia) {
        this.filter.addOrUpdateFilter("sepia", `${sepia}%`);
        this.applyFilters();
    }

    applyFilters() {
        this.context.filter = this.filter.getFilters();
        this.redraw();
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