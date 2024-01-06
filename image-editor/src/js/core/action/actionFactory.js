import ActionManager from "./actionManager";
import BrightnessAction from "./actions/brightnessAction/brightnessAction";
import ContrastAction from "./actions/contrastAction/contrastAction";
import LoadAction from "./actions/loadAction/loadAction";
import SaturationAction from "./actions/saturationAction/saturationAction";
import GrayscaleAction from "./actions/grayscaleAction/grayscaleAction";
import HueRotationAction from "./actions/hueRotationAction/hueRotationAction";
import InvertAction from "./actions/invertAction/invertAction";
import SepiaAction from "./actions/sepiaAction/sepiaAction";
import BlurAction from "./actions/blurAction/blurAction";
import FlipAction from "./actions/flipAction/flipAction";
import ActionType from "../enum/actionType.enum";
import RotateAction from "./actions/rotateAction/rotateAction";
import UpscaleAction from "./actions/upscaleAction/upscaleAction";
import ResizeAction from "./actions/resizeAction/resizeAction";

export default class ActionFactory {

    /**
     * @param {ActionManager} actionManager 
     */
    constructor(actionManager) {
        this.actionManager = actionManager;
    }

    /**
     * @param {import("./actions/loadAction/loadActionData").LoadActionData} data 
     * @returns {LoadAction}
     */
    loadAction(data) {
        return this.createAction(LoadAction, data, true);
    }

    /**
     * @param {import("./actions/brightnessAction/brightnessActionData").BrightnessActionData} data 
     * @returns {BrightnessAction}
     */
    brightnessAction(data) {
        return this.createAction(BrightnessAction, data);
    }

    /**
     * @param {import("./actions/contrastAction/contrastActionData").ContrastActionData} data 
     * @returns {ContrastAction}
     */
    contrastAction(data) {
        return this.createAction(ContrastAction, data)
    }

    /**
     * @param {import("./actions/saturationAction/saturationActionData").SaturationActionData} data 
     * @returns {SaturationAction}
     */
    saturationAction(data) {
        return this.createAction(SaturationAction, data);
    }

    /**
     * @param {import("./actions/grayscaleAction/grayscaleActionData").GrayscaleActionData} data 
     * @returns {GrayscaleAction}
     */
    grayscaleAction(data) {
        return this.createAction(GrayscaleAction, data);
    }

    /**
     * @param {import("./actions/hueRotationAction/hueRotationActionData").HueRotationActionData} data 
     * @returns {HueRotationAction}
     */
    hueRotationAction(data) {
        return this.createAction(HueRotationAction, data);
    }

    /**
     * @param {import("./actions/invertAction/invertActionData").InvertActionData} data 
     * @returns {InvertAction}
     */
    invertAction(data) {
        return this.createAction(InvertAction, data)
    }

    /**
     * @param {import("./actions/sepiaAction/sepiaActionData").SepiaActionData} data 
     * @returns {SepiaAction}
     */
    sepiaAction(data) {
        return this.createAction(SepiaAction, data)
    }

    /**
     * @param {import("./actions/blurAction/blurActionData").BlurActionData} data 
     * @returns {BlurAction}
     */
    blurAction(data) {
        return this.createAction(BlurAction, data);
    }

    /**
     * @param {import("./actions/flipAction/flipActionData").FlipActionData} data 
     * @returns {FlipAction}
     */
    flipAction(data) {
        const currentAction = this.actionManager.getCurrentAction()

        // If its the same flip type then update the current action, else create a new action
        if (currentAction && currentAction.type === ActionType.FLIP) {
            if (currentAction.data.flipOrientation === data.flipOrientation) {
                return currentAction;
            }
        }

        return this.createAction(FlipAction, data, true);
    }

    /**
     * @param {import(import("./actions/upscaleAction/upscaleActionData").UpscaleActionData)} data 
     * @returns {UpscaleAction}
     */
    upscaleAction(data) {
        return this.createAction(UpscaleAction, data, true);
    }

    /**
     * @param {import("./actions/rotateAction/rotateActionData").RotateActionData} data 
     * @returns {RotateAction}
     */
    rotateAction(data) {
        return this.createAction(RotateAction, data, true);
    }

    /**
     * @param {import("./actions/resizeAction/resizeActionData").ResizeActionData} data 
     * @returns {ResizeAction}
     */
    resizeAction(data) {
        return this.createAction(ResizeAction, data)
    }

    /**
     * @template {new (...args: any[]) => {}} AC
     * @param {AC} ActionClass
     * @param {ConstructorParameters<AC>[0]} actionData
     * @param {boolean} override - Whether to override the same action check
     * @returns {InstanceType<AC>}
     */
    createAction(ActionClass, actionData, override = false) {
        const currentAction = this.actionManager.getCurrentAction();

        if (!override && currentAction && currentAction instanceof ActionClass) {
            return currentAction;
        }

        const action = new ActionClass(this.actionManager.canvas, actionData);

        this.actionManager.addAction(action);

        return action;
    }

}
