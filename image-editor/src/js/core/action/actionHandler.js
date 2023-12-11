import { UserPreferences } from "../storage/userPreferences";
import ActionManager from "./actionManager";

class ActionHandler {
    /**
     * @param {ActionManager} actionManager 
     * @param {UserPreferences} preferences 
     */
    constructor(actionManager, preferences) {
        this.actionManager = actionManager;
        this.preferences = preferences;
    }

    handleImageSelect = async (loadImageActionType, imageData) => {
        const data = {
            loadImageActionType,
            imageData,
        };

        const action = this.actionManager.add.loadAction(data);

        await action.execute(data);
    };

    handleAdjustBrightness = async (brightness) => {
        this.preferences.setPreference("brightness", brightness);

        const data = {
            brightness: this.preferences.getPreference("brightness"),
        };

        const action = this.actionManager.add.brightnessAction(data);

        await action.update(data);
    };

    handleAdjustContrast = async (contrast) => {
        this.preferences.setPreference("contrast", contrast);

        const data = {
            contrast: this.preferences.getPreference("contrast"),
        };

        const action = this.actionManager.add.contrastAction(data);

        await action.update(data);
    };

    handleAdjustSaturation = async (saturation) => {
        this.preferences.setPreference("saturation", saturation);

        const data = {
            saturation: this.preferences.getPreference("saturation"),
        };

        const action = this.actionManager.add.saturationAction(data);

        await action.update(data);
    };

    handleAdjustGrayscale = async (grayscale) => {
        console.log(this, grayscale)
        this.preferences.setPreference("grayscale", grayscale);

        const data = {
            grayscale: this.preferences.getPreference("grayscale"),
        };

        const action = this.actionManager.add.grayscaleAction(data);

        await action.update(data);
    };
}

export default ActionHandler;
