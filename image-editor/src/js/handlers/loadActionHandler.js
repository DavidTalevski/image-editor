import UserPreferences from "../core/storage/userPreferences";
import ActionManager from "../core/action/actionManager";
import LoadImageActionType from "../core/enum/loadImageActionType.enum";
import MD5HashGenerator from "../utils/MD5HashGenerator";
import CanvasController from "../core/canvas/canvasController";

export default class LoadActionHandler {
    /**
     * @param {ActionManager} actionManager 
     * @param {UserPreferences} preferences 
     * @param {CanvasController} canvas
     */
    constructor(actionManager, preferences, canvas) {
        this.actionManager = actionManager;
        this.preferences = preferences;
        this.canvas = canvas;
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

        try {
            await this.actionManager.updateAction(action, data);
        } catch (e) {
            console.log(e);
            this.actionManager.emit(this.actionManager.events.ACTION_UPDATED, action);
            this.actionManager.removeLastAction()
        }
    };

    /**
     * @param {import("../core/action/actions/upscaleAction/upscaleActionData").UpscaleSettings} object 
     */
    handleUpscaleImage = async (object) => {
        const canvasBase64 = this.canvas.getSaveData("jpeg");
        const MD5Hash = new MD5HashGenerator().generateMD5Hash(canvasBase64);

        const data = {
            MD5Hash: MD5Hash,
            settings: object,
            URL: "http://localhost:4000/upscale"
        }

        const action = this.actionManager.add.upscaleAction(data);

        await this.actionManager.updateAction(action, data);
    }
}
