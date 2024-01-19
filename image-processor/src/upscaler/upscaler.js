const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Waifu2x = require('waifu2x');
const upscalerConfig = require('./upscalerConfig.js');

const waifu2x = Waifu2x.default;
const OPTIONS = upscalerConfig;

/**
 * @typedef UpscaleSettings
 * @property {'real-esrgan' | 'waifu2x'} upscalerType - The type of upscaler, either 'ESRGAN' or 'ANIME'.
 * @property {2 | 3 | 4} upscaleFactor - The factor by which the image should be upscaled (2, 3, or 4).
 * @property {'noise' | 'scale' | 'both'} mode - The mode for ANIME upscaler, can be 'noise', 'scale', or 'both'.
 * @property {0 | 1 | 2 | 3} noiseLevel - The noise level for ANIME upscaler, a value between 0 and 3.
 */

class Upscaler {

    /**
     * @param {string} input_path 
     * @param {string} output_path 
     * @param {UpscaleSettings} settings 
     */
    async upscale(input_path, output_path, settings) {
        console.log("Upscaling image:", input_path);

        // warcrime
        if (settings.mode == "both") settings.mode = "noise-scale";

        const upscaled_path = this.getTemporaryFilePath(output_path, 1);

        await waifu2x.upscaleImage(input_path, upscaled_path, settings);
        console.log("Created upscaled image:", upscaled_path);

        const process = sharp(upscaled_path);

        if (path.extname(upscaled_path).match(/(.jpg|.jpeg|.JPG|.JPEG)/)) {
            process.jpeg(OPTIONS.SHARP_JPG_OPTIONS);
        } else {
            process.png(OPTIONS.SHARP_PNG_OPTIONS);
        }

        try {
            await process.toFile(output_path);
            console.log("Saved image:", output_path);
        } catch (e) {
            console.log("Unable to save file: ", e);
        }

        fs.unlinkSync(input_path);
        fs.unlinkSync(upscaled_path);
    }

    /**
     * @param {string} input_path 
     * @param {string} custom 
     * @returns {string}
     */
    getTemporaryFilePath(input_path, custom) {
        const extension = path.extname(input_path);
        const folder_path = input_path.slice(0, -(extension.length));
        return folder_path + "_temporary" + custom + extension;
    }
}

module.exports = new Upscaler();
