import { ImageLoaderError } from "./enum/imageLoaderError.enum";

export class ImageLoader {

    /** @protected */
    TAG = "[Image Loader]";

    /**
     * @param {Blob} file 
     * @returns {Promise<HTMLImageElement>}
     */
    load(blob) {
        return new Promise(async (resolve, reject) => {
            let fileData;

            try {
                fileData = await this.read(blob)
            } catch (e) {
                return reject(e);
            }

            const image = new Image();

            image.onerror = (e) => {
                console.log(this.TAG, "Failed loading image:", e);
                reject(ImageLoaderError.FAILED_LOADING_FILE);
            }

            image.onload = () => {
                console.log(this.TAG, "Successfully loaded image")
                resolve(image)
            };

            image.src = fileData;
        })
    }

    /**
     * @param {Blob} blob 
     * @returns {Promise<String>}
     */
    read(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onerror = (e) => {
                console.log(this.TAG, "Failed reading file:", e);
                reject(ImageLoaderError.FAILED_READING_FILE);
            }

            reader.onload = (e) => {
                console.log(this.TAG, "Successfully read file");
                resolve(e.target.result);
            }

            reader.readAsDataURL(blob);
        })
    }

}