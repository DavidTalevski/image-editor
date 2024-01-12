/**
 * @typedef UpscaleActionData
 * @property {string} URL
 * @property {UpscaleSettings} settings
 * @property {string} MD5Hash
 */

/**
 * @typedef {Object} UpscaleSettings
 * @property {'real-esrgan' | 'waifu2x'} upscalerType - The type of upscaler, either 'ESRGAN' or 'ANIME'.
 * @property {2 | 3 | 4} upscaleFactor - The factor by which the image should be upscaled (2, 3, or 4).
 * @property {'noise' | 'scale' | 'noise-scale'} mode - The mode for ANIME upscaler, can be 'noise', 'scale', or 'noise-scale'.
 * @property {0 | 1 | 2 | 3} noiseLevel - The noise level for ANIME upscaler, a value between 0 and 3.
 */

export default {};