import ImageType from "../enum/imageType.enum"

const StoredUserPreferences = {
    /** @type {ImageType} */
    downloadImageType: ImageType.PNG,
    imageQuality: 1,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
    hueRotation: 0,
    sepia: 0,
    blur: 0,
    invert: 0,
    savedActions: []
}

export default StoredUserPreferences