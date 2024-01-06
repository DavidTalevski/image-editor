/** @enum {number} */
const ActionType = Object.freeze({
    LOAD: 0,
    BRIGHTNESS: 1,
    CONTRAST: 2,
    SATURATION: 3,
    GRAYSCALE: 4,
    HUE_ROTATION: 5,
    INVERT: 6,
    BLUR: 7,
    SEPIA: 8,
    FLIP: 9,
    ROTATE: 10,
    UPSCALE: 11,
    RESIZE: 12
})

export default ActionType;