import Action from "../action";
import ActionType from "../../../enum/actionType.enum";
import CanvasController from "../../../canvas/canvasController";
import FlipType from "../../../../enum/flipType.enum";

export default class FlipAction extends Action {
    /**
     * @type {import("./flipActionData").FlipActionData}
     */
    data;

    type = ActionType.FLIP;

    /**
     * @param {CanvasController} canvas
     * @param {LoadActionData} data
     */
    constructor(canvas, data) {
        super(canvas, data);
    }

    async execute() {
        super.execute();

        const context = this.canvas.getContext();

        if (this.data.flipType == FlipType.HORIZONTAL) {
            this.flipCanvasHorizontally(context);
        } else {
            this.flipCanvasVertically(context);
        }
    }

    /**
     * Flip the entire canvas horizontally
     * @param {CanvasRenderingContext2D} context
     */
    flipCanvasHorizontally(context) {
        // Save the current state of the context
        context.save();

        // Flip the canvas horizontally
        context.translate(context.canvas.width, 0);
        context.scale(-1, 1);

        // Draw the entire canvas on the flipped canvas
        context.drawImage(context.canvas, 0, 0);

        // Restore the saved state (optional)
        context.restore();
    }

    /**
     * Flip the entire canvas vertically
     * @param {CanvasRenderingContext2D} context
     */
    flipCanvasVertically(context) {
        // Save the current state of the context
        context.save();

        // Flip the canvas vertically
        context.translate(0, context.canvas.height);
        context.scale(1, -1);

        // Draw the entire canvas on the flipped canvas
        context.drawImage(context.canvas, 0, 0);

        // Restore the saved state (optional)
        context.restore();
    }
}
