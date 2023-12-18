import UserPreferences from "../core/storage/userPreferences";
import ActionManager from "../core/action/actionManager";

export default class FilterActionHandler {
    /**
     * @param {ActionManager} actionManager 
     * @param {UserPreferences} preferences 
     */
    constructor(actionManager, preferences) {
        this.actionManager = actionManager;
        this.preferences = preferences;
    }

    /**
     * @param {number} brightness 
     */
    handleBrightness = async (brightness) => {
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
    handleContrast = async (contrast) => {
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
    handleSaturation = async (saturation) => {
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
    handleGrayscale = async (grayscale) => {
        this.preferences.setPreference("grayscale", grayscale);

        const data = {
            grayscale: this.preferences.getPreference("grayscale"),
        };

        const action = this.actionManager.add.grayscaleAction(data);

        await action.update(data);
    };

    /**
     * @param {number} hueRotationDegrees 
     */
    handleHueRotation = async (hueRotationDegrees) => {
        this.preferences.setPreference("hueRotationDegrees", hueRotationDegrees);

        const data = {
            hueRotationDegrees: this.preferences.getPreference("hueRotationDegrees"),
        };

        const action = this.actionManager.add.hueRotationAction(data);

        await action.update(data);
    };

    /**
     * @param {number} sepia 
     */
    handleSepia = async (sepia) => {
        this.preferences.setPreference("sepia", sepia);

        const data = {
            sepia: this.preferences.getPreference("sepia"),
        };

        const action = this.actionManager.add.sepiaAction(data);

        await action.update(data);
    };

    /**
     * @param {number} blur 
     */
    handleBlur = async (blur) => {
        this.preferences.setPreference("blur", blur);

        const data = {
            blur: this.preferences.getPreference("blur"),
        };

        const action = this.actionManager.add.blurAction(data);

        await action.update(data);
    };

    /**
     * @param {number} invert 
     */
    handleInvert = async (invert) => {
        this.preferences.setPreference("invert", invert);

        const data = {
            invert: this.preferences.getPreference("invert"),
        };

        const action = this.actionManager.add.invertAction(data);

        await action.update(data);
    };
}
