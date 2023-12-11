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
        return this.createAction(LoadAction, data);
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
     * @template {new (...args: any[]) => {}} AC
     * @param {AC} ActionClass
     * @param {ConstructorParameters<AC>[0]} actionData
     * @returns {InstanceType<AC>}
     */
    createAction(ActionClass, actionData) {
        const currentAction = this.actionManager.getCurrentAction();

        if (currentAction && currentAction instanceof ActionClass) {
            return currentAction;
        }

        const action = new ActionClass(this.actionManager.canvas, actionData);

        this.actionManager.addAction(action);

        return action;
    }

}