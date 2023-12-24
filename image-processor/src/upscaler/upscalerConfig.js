const INITIAL_UPSCALE_OPTIONS = {
    scale: 1,
    noise: 1
}

const MAIN_UPSCALE_OPTIONS = {
    scale: 4,
    upscaler: "real-esrgan"
}

const SHARP_PNG_OPTIONS = {
    progressive: true,
    colors: 256,
    palette: true,
    adaptiveFiltering: true,
    compressionLevel: 8,
    quality: 100,
    effort: 10,
}

const SHARP_JPG_OPTIONS = {
    quality: 77,
}

module.exports = { INITIAL_UPSCALE_OPTIONS, MAIN_UPSCALE_OPTIONS, SHARP_PNG_OPTIONS, SHARP_JPG_OPTIONS };