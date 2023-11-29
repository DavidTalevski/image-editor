import { ImageLoaderError } from "./enum/imageLoaderError.enum";

export class ImageLoader {

    /** @protected */
    TAG = "[Image Loader]";

    static Error = ImageLoaderError;

    /**
     * @param {string} url 
     * @returns {Promise<HTMLImageElement>}
     */
    loadFromUrl(url) {
        return this.load(url);
    }

    /**
     * @param {Blob} blob
     * @returns {Promise<HTMLImageElement>}
     */
    async loadFromBlob(blob) {
        let fileData;

        try {
            fileData = await this.read(blob)
        } catch (e) {
            throw e;
        }

        return this.load(fileData);
    }

    /**
     * @returns {Promise<HTMLImageElement>}
     */
    async loadFromClipboard() {
        let data;

        try {
            data = await navigator.clipboard.read();
        } catch (e) {
            throw ImageLoader.Error.FAILED_READING_CLIPBOARD;
        }

        if (!data) throw ImageLoader.Error.NO_IMAGE_COPIED_IN_CLIPBOARD;

        for (const item of data) {
            if (item.types.includes("image/png")) {
                const blob = await item.getType("image/png");
                return this.loadFromBlob(blob);
            }
        }

        throw ImageLoader.Error.NO_IMAGE_COPIED_IN_CLIPBOARD;
    }


    /**
     * @private
     * @param {Blob} blob 
     * @returns {Promise<String>}
     */
    read(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onerror = (e) => {
                console.log(this.TAG, "Failed reading file:", e);
                reject(ImageLoader.Error.FAILED_READING_FILE);
            }

            reader.onload = (e) => {
                console.log(this.TAG, "Successfully read file");
                resolve(e.target.result);
            }

            reader.readAsDataURL(blob);
        })
    }

    /**
     * @private
     * @param {any} data 
     * @returns {Promise<HTMLImageElement>}
     */
    load(data) {
        return new Promise(async (resolve, reject) => {
            const image = new Image();

            image.onerror = (e) => {
                console.log(this.TAG, "Failed loading image:", e);
                reject(ImageLoader.Error.FAILED_LOADING_FILE);
            }

            image.onload = () => {
                console.log(this.TAG, "Successfully loaded image")
                resolve(image)
            };

            image.src = data;
        })
    }

}