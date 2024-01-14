import EventEmitter from "eventemitter3";
import ImageType from "../enum/imageType.enum";
import CanvasEvents from "./canvasEvents.enum";
import CanvasFilterManager from "./canvasFilterManager";

export default class CanvasController extends EventEmitter {

    events = CanvasEvents;

    constructor() {
        super();
        this.filter = new CanvasFilterManager();
    }

    /**
     * @param {HTMLCanvasElement} canvas 
     */
    setCanvas(canvas) {
        this.canvas = canvas;
        this.context = this.getContext();
    }

    getContext() {
        return this.canvas.getContext("2d");
    }

    getClientWidth() {
        if (!this.canvas) return 0;

        return this.canvas.clientWidth;
    }

    getClientHeight() {
        if (!this.canvas) return 0;

        return this.canvas.clientHeight;
    }

    getWidth() {
        if (!this.canvas) return 0;

        return this.canvas.width;
    }

    getHeight() {
        if (!this.canvas) return 0;

        return this.canvas.height;
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * // need to change
     * @param {HTMLImageElement} image 
     */
    drawImage(image, width, height, x, y) {
        this.canvas.width = width ?? image.width;
        this.canvas.height = height ?? image.height;

        this.clear();
        this.context.drawImage(image, x ?? 0, y ?? 0, this.canvas.width, this.canvas.height);

        this.emit(this.events.DRAW_IMAGE, image);
    }

    clear() {
        if (!this.canvas) return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    redraw() {
        this.context.drawImage(this.canvas, 0, 0);

        this.emit(this.events.DRAW_IMAGE, this.canvas);
    }

    /**
     * @param {number} brightness 
     */
    setBrightness(brightness) {
        this.filter.clearFilters();
        this.filter.addOrUpdateFilter("brightness", `${brightness}%`);
        this.applyFilters();
    }

    /**
     * @param {contrast} brightness 
     */
    setContrast(contrast) {
        this.filter.clearFilters();
        this.filter.addOrUpdateFilter("contrast", `${contrast}%`);
        this.applyFilters();
    }

    /**
     * @param {number} grayscale 
     */
    setGrayscale(grayscale) {
        this.filter.clearFilters();
        this.filter.addOrUpdateFilter("grayscale", `${grayscale}%`);
        this.applyFilters();
    }

    /**
     * @param {saturation} brightness 
     */
    setSaturation(saturation) {
        this.filter.clearFilters();
        this.filter.addOrUpdateFilter("saturate", `${saturation}%`);
        this.applyFilters();
    }

    /**
     * @param {number} hueRotationDegrees 
     */
    setHueRotation(hueRotationDegrees) {
        this.filter.clearFilters();
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
        this.filter.clearFilters();
        this.filter.addOrUpdateFilter("blur", `${blur}px`);
        this.applyFilters();
    }

    /**
     * @param {number} sepia 
     */
    setSepia(sepia) {
        this.filter.clearFilters();
        this.filter.addOrUpdateFilter("sepia", `${sepia}%`);
        this.applyFilters();
    }

    applyFilters() {
        this.context.filter = this.filter.getFilters();
        this.redraw();
    }

    clearFilters() {
        this.filter.clearFilters();
        this.context.filter = "none"
    }

    /**
     * @param {(typeof ImageType)[keyof typeof ImageType]=} format
     * @param {number=} quality - For JPEG/WEBP images, specify the quality (0 to 1)
     * @returns {string}
     */
    getSaveData(format = ImageType.PNG, quality = 1) {
        if (!this.canvas) return;
        return this.canvas.toDataURL(`image/${format}`, quality);
    }

    /**
     * @returns {Promise<Blob>}
     */
    getDataAsBlob() {
        return new Promise((resolve, reject) => {
            this.canvas.toBlob((blob) => {
                resolve(blob);
            });
        })
    }
}