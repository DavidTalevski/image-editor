import Action from "../action";
import ActionType from "../../../enum/actionType.enum";
import FlipOrientation from "../../../../enum/flipOrientation.enum";

export default class FlipAction extends Action {
    /**
     * @type {import("./flipActionData").FlipActionData}
     */
    data;

    title = "Flip Image";

    type = ActionType.FLIP;

    async execute() {
        super.execute();

        if (this.data.flipOrientation === FlipOrientation.HORIZONTAL) {
            this.description = "Flip horizontally";
            this.flipCanvasHorizontally();
        } else {
            this.description = "Flip vertically";
            this.flipCanvasVertically();
        }

    }

    flipCanvasHorizontally() {
        const context = this.canvas.getContext();

        context.save();

        this.canvas.clearFilters();

        context.translate(context.canvas.width, 0);
        context.scale(-1, 1);

        context.drawImage(context.canvas, 0, 0);

        context.restore();
    }

    flipCanvasVertically() {
        const context = this.canvas.getContext();

        context.save();

        this.canvas.clearFilters();

        context.translate(0, context.canvas.height);
        context.scale(1, -1);

        context.drawImage(context.canvas, 0, 0);

        context.restore();
    }
}
