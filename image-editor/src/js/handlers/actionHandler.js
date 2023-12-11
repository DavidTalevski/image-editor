import { UserPreferences } from "../core/storage/userPreferences";
import ActionManager from "../core/action/actionManager";
import LoadImageActionType from "../core/enum/loadImageActionType.enum";

class ActionHandler {
    /**
     * @param {ActionManager} actionManager 
     * @param {UserPreferences} preferences 
     */
    constructor(actionManager, preferences) {
        this.actionManager = actionManager;
        this.preferences = preferences;
    }

    /**
     * @param {LoadImageActionType} loadImageActionType 
     * @param {any} imageData 
     */
    handleImageSelect = async (loadImageActionType, imageData) => {
        const data = {
            loadImageActionType: loadImageActionType,
            imageData: imageData
        }

        const action = this.actionManager.add.loadAction(data);

        await action.execute(data);
    };

    /**
     * @param {number} brightness 
     */
    handleAdjustBrightness = async (brightness) => {
        this.preferences.setPreference("brightness", brightness);

        const data = {
            brightness: this.preferences.getPreference("brightness"),
        };

        const action = this.actionManager.add.brightnessAction(data);

        await action.update(data);
    };

    /**
     * @param {number} contrast 
     */
    handleAdjustContrast = async (contrast) => {
        this.preferences.setPreference("contrast", contrast);

        const data = {
            contrast: this.preferences.getPreference("contrast"),
        };

        const action = this.actionManager.add.contrastAction(data);

        await action.update(data);
    };

    /**
     * @param {number} saturation 
     */
    handleAdjustSaturation = async (saturation) => {
        this.preferences.setPreference("saturation", saturation);

        const data = {
            saturation: this.preferences.getPreference("saturation"),
        };

        const action = this.actionManager.add.saturationAction(data);

        await action.update(data);
    };

    /**
     * @param {number} grayscale 
     */
    handleAdjustGrayscale = async (grayscale) => {
        this.preferences.setPreference("grayscale", grayscale);

        const data = {
            grayscale: this.preferences.getPreference("grayscale"),
        };

        const action = this.actionManager.add.grayscaleAction(data);

        await action.update(data);
    };

    /**
     * 
     * @param {number} hueRotationDegrees 
     */
    handleAdjustHueRotation = async (hueRotationDegrees) => {
        this.preferences.setPreference("hueRotationDegrees", hueRotationDegrees);

        const data = {
            hueRotationDegrees: this.preferences.getPreference("hueRotationDegrees"),
        };

        const action = this.actionManager.add.hueRotationAction(data);

        await action.update(data);
    };
}

export default ActionHandler;
