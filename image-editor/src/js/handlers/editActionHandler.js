import UserPreferences from "../core/storage/userPreferences";
import ActionManager from "../core/action/actionManager";
import FlipOrientation from "../enum/flipOrientation.enum";

export default class EditActionHandler {
    /**
     * @param {ActionManager} actionManager 
     * @param {UserPreferences} preferences 
     */
    constructor(actionManager, preferences) {
        this.actionManager = actionManager;
        this.preferences = preferences;
    }

    /**
     * @param {number} crop 
     */
    handleCrop = async (crop) => {

        const data = {
            crop: crop,
        };

        const action = this.actionManager.add.cropAction(data);

        await this.actionManager.updateAction(action, data);
    };

    /**
     * @param {number} resize 
     */
    handleResize = async (resize) => {
        const data = {
            resize: resize,
        };

        const action = this.actionManager.add.resizeAction(data);

        await this.actionManager.updateAction(action, data);
    };

    /**
     * @param {number} degrees
     */
    handleRotate = async (degrees) => {

        const data = {
            degrees: degrees,
        };

        const action = this.actionManager.add.rotateAction(data);

        await this.actionManager.updateAction(action, data);
    };

    /**
     * @param {FlipOrientation} flip 
     */
    handleFlip = async (flip) => {

        const data = {
            flipOrientation: flip
        };

        const action = this.actionManager.add.flipAction(data);

        await this.actionManager.updateAction(action, data);
    };
}
