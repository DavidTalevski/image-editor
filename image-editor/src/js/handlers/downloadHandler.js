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
        this.downloader = new Downloader(actionManager.canvas);

        /** @private */
        this.preferences = preferences;

        /** @private */
        this.actionManager = actionManager;
    }

    /** @private */
    downloadImage(fileName, format) {
        this.downloader.downloadCanvas(fileName, format, this.preferences.getPreference("imageQuality"));
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
