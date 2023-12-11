import { ImageDownloader } from "../core/downloader/imageDownloader";
import { UserPreferences } from "../core/storage/userPreferences";

class ImageDownloadHandler {

    /**
     * @param {ImageDownloader} downloader 
     * @param {UserPreferences} preferences 
     */
    constructor(downloader, preferences) {
        /** @private */
        this.downloader = downloader;

        /** @private */
        this.preferences = preferences;
    }

    /** @private */
    downloadImage(fileName, format) {
        this.downloader.download(fileName, format, this.preferences.getPreference("imageQuality"));
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
}

export default ImageDownloadHandler;
