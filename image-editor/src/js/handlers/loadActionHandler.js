import { UserPreferences } from "../core/storage/userPreferences";
import ActionManager from "../core/action/actionManager";
import LoadImageActionType from "../core/enum/loadImageActionType.enum";

export default class LoadActionHandler {
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
}
