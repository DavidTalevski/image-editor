import { ImageType } from "../enum/imageType.enum"

export const StoredUserPreferences = {
    /** @type {ImageType} */
    downloadImageType: ImageType.PNG,
    imageQuality: 1,
    brightness: 100,
    contrast: 100,
    saturation: 0,
    /**
     * @type {import("../snapshots/snapshot").Snapshot[]}
     */
    snapshots: []
}