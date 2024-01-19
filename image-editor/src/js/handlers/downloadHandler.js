import ActionManager from "../core/action/actionManager";
import Downloader from "../core/downloader/downloader";
import UserPreferences from "../core/storage/userPreferences";

class ImageDownloadHandler {

    /**
     * @param {ActionManager} actionManager
     * @param {UserPreferences} preferences 
     */
    constructor(actionManager, preferences) {
        /** @private */
        this.downloader = new Downloader();

        /** @private */
        this.preferences = preferences;

        /** @private */
        this.actionManager = actionManager;
    }

    /** @private */
    downloadImage(fileName, format) {
        const q = this.preferences.getPreference("imageQuality");
        this.downloader.downloadCanvas(this.actionManager.canvas, fileName, format, q);
    };

    handleDownloadAsPNG = (fileName) => {
        this.downloadImage(fileName, "png");
    };

    handleDownloadAsWebP = (fileName) => {
        this.downloadImage(fileName, "webp");
    };

    handleDownloadAsJPEG = (fileName) => {
        this.downloadImage(fileName, "jpeg");
    };

    handleDownloadProject = (fileName) => {
        const data = JSON.stringify(this.actionManager.getActionSaveData(), null, 2);
        this.downloader.downloadJSON(fileName, data);
    }
}

export default ImageDownloadHandler;
