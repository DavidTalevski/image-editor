import UserPreferences from "../core/storage/userPreferences";
import ActionManager from "../core/action/actionManager";
import LoadImageActionType from "../core/enum/loadImageActionType.enum";
import MD5HashGenerator from "../utils/MD5HashGenerator";
import CanvasController from "../core/canvas/canvasController";

export default class LoadActionHandler {
    /**
     * @param {ActionManager} actionManager 
     * @param {UserPreferences} preferences 
     */
    constructor(actionManager, preferences) {
        /** @private */
        this.actionManager = actionManager;

        /** @private */
        this.preferences = preferences;
    }

    /**
     * @param {LoadImageActionType} loadImageActionType 
     * @param {any} imageData 
     */
    handleImageSelect = async (loadImageActionType, imageData) => {
        console.log("aaaaa")
        const data = {
            loadImageActionType: loadImageActionType,
            imageData: imageData
        }

        const action = this.actionManager.add.loadAction(data);

        try {
            await this.actionManager.updateAction(action, data);
        } catch (e) {
            console.log(e);
            alert("Unable to load image!")
            this.actionManager.emit(this.actionManager.events.ACTION_UPDATED, action);
            this.actionManager.removeLastAction()
        }
    };

    /**
     * @param {import("../core/action/actions/upscaleAction/upscaleActionData").UpscaleSettings} object 
     */
    handleUpscaleImage = async (object) => {
        const canvasBase64 = this.actionManager.canvas.getSaveData("jpeg");
        const MD5Hash = new MD5HashGenerator().generateMD5Hash(canvasBase64);

        const data = {
            MD5Hash: MD5Hash,
            settings: object,
            URL: "http://localhost:4000/upscale"
        }

        const action = this.actionManager.add.upscaleAction(data);

        try {
            await this.actionManager.updateAction(action, data);
        } catch (e) {
            console.log(e);
            alert("Unable to upscale image!")
            this.actionManager.emit(this.actionManager.events.ACTION_UPDATED, action);
            this.actionManager.removeLastAction();
        }
    }

    handleProjectLoad = (file) => {
        // Use FileReader to read the contents of the JSON file
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(event.target.result);

                this.actionManager.removeAllActions();
                this.actionManager.loadSavedActions(jsonData);
                // TODO
                this.actionManager.executeAllActionsBetween(0, this.actionManager.actionQueue.length - 1);

                // Now you can use the jsonData as a usable object
                console.log('Parsed JSON data:', jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert("Unable to load project file!");
            }
        };

        // Read the contents of the JSON file
        reader.readAsText(file);
    }
}
