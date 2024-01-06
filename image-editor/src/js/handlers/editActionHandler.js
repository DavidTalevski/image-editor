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
