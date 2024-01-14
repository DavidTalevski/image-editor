import ActionType from "../../enum/actionType.enum";
import LoadAction from "../actions/loadAction/loadAction";
import BrightnessAction from "../actions/brightnessAction/brightnessAction";
import ContrastAction from "../actions/contrastAction/contrastAction";
import SaturationAction from "../actions/saturationAction/saturationAction";
import GrayscaleAction from "../actions/grayscaleAction/grayscaleAction";
import HueRotationAction from "../actions/hueRotationAction/hueRotationAction";
import InvertAction from "../actions/invertAction/invertAction";
import SepiaAction from "../actions/sepiaAction/sepiaAction";
import BlurAction from "../actions/blurAction/blurAction";
import FlipAction from "../actions/flipAction/flipAction";
import RotateAction from "../actions/rotateAction/rotateAction";
import UpscaleAction from "../actions/upscaleAction/upscaleAction";
import ResizeAction from "../actions/resizeAction/resizeAction";
import CropAction from "../actions/cropAction/cropAction";

const ActionRegistry = [
    {
        type: ActionType.LOAD,
        class: LoadAction
    },
    {
        type: ActionType.BRIGHTNESS,
        class: BrightnessAction
    },
    {
        type: ActionType.CONTRAST,
        class: ContrastAction
    },
    {
        type: ActionType.SATURATION,
        class: SaturationAction
    },
    {
        type: ActionType.GRAYSCALE,
        class: GrayscaleAction
    },
    {
        type: ActionType.HUE_ROTATION,
        class: HueRotationAction
    },
    {
        type: ActionType.INVERT,
        class: InvertAction
    },
    {
        type: ActionType.SEPIA,
        class: SepiaAction
    },
    {
        type: ActionType.BLUR,
        class: BlurAction
    },
    {
        type: ActionType.FLIP,
        class: FlipAction
    },
    {
        type: ActionType.ROTATE,
        class: RotateAction
    },
    {
        type: ActionType.UPSCALE,
        class: UpscaleAction
    },
    {
        type: ActionType.RESIZE,
        class: ResizeAction
    },
    {
        type: ActionType.CROP,
        class: CropAction
    },
];

export default ActionRegistry;