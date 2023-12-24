const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Waifu2x = require('waifu2x');
const upscalerConfig = require('./upscalerConfig.js');

const waifu2x = Waifu2x.default;
const OPTIONS = upscalerConfig;

class Upscaler {
    async upscale(input_path, output_path) {
        console.log("Upscaling image:", input_path);

        const upscaled_path = this.getTemporaryFilePath(output_path, 1);

        await waifu2x.upscaleImage(input_path, upscaled_path, OPTIONS.MAIN_UPSCALE_OPTIONS);
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
            console.log("Unable to save file: ", image, e);
        }

        fs.unlinkSync(input_path);
        fs.unlinkSync(upscaled_path);
    }

    getTemporaryFilePath(input_path, custom) {
        const extension = path.extname(input_path);
        const folder_path = input_path.slice(0, -(extension.length));
        return folder_path + "_temporary" + custom + extension;
    }
}

module.exports = new Upscaler();
