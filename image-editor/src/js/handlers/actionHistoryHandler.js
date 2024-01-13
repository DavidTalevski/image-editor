import ActionManager from "../core/action/actionManager";
import CanvasController from "../core/canvas/canvasController";

class ActionHistoryHandler {

    /**
     * @param {ActionManager} actionManager 
     * @param {CanvasController} canvas
     */
    constructor(actionManager, canvas) {
        /** @private */
        this.actionManager = actionManager;

        /** @private */
        this.canvas = canvas;
    }

    handleHistoryCardClick = async (id) => {
        this.canvas.clear();
        await this.actionManager.executeAllActionsBetween(0, id);
    }

    handleClearHistory = () => {
        this.actionManager.removeAllActions();
        this.canvas.clear();
    }

}

export default ActionHistoryHandler;
