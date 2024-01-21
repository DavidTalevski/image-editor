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

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.getWidth();
        tempCanvas.height = this.canvas.getHeight();

        const tempContext = tempCanvas.getContext('2d');

        this.canvas.clearFilters();

        tempContext.translate(tempCanvas.width, 0);
        tempContext.scale(-1, 1);
        tempContext.drawImage(context.canvas, 0, 0);

        this.canvas.clear();

        context.drawImage(tempCanvas, 0, 0);
    }

    flipCanvasVertically() {
        const context = this.canvas.getContext();

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.getWidth();
        tempCanvas.height = this.canvas.getHeight();

        const tempContext = tempCanvas.getContext('2d');

        this.canvas.clearFilters();

        tempContext.translate(0, tempCanvas.height);
        tempContext.scale(1, -1);
        tempContext.drawImage(context.canvas, 0, 0);

        this.canvas.clear();

        context.drawImage(tempCanvas, 0, 0);
    }
}
