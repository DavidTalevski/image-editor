import Action from "../action";
import ActionType from "../../../enum/actionType.enum";
import { ImageLoader } from "../../../loader/imageLoader";

export default class CropAction extends Action {
    /**
     * @type {import("./cropActionData").CropActionData}
     */
    data;

    title = "Crop Image";

    description = "";

    type = ActionType.CROP;

    loader = new ImageLoader();

    async execute() {
        super.execute();

        this.crop(this.data.x, this.data.y, this.data.width, this.data.height)
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    crop(x, y, width, height) {
        // Create a temporary canvas to hold the cropped image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;

        // Get the 2D context of the source canvas and temporary canvas
        const tempContext = tempCanvas.getContext('2d');

        const canvasWidth = this.canvas.getWidth();
        const canvasHeight = this.canvas.getHeight();

        const clientWidth = this.canvas.getClientWidth();
        const clientHeight = this.canvas.getClientHeight();

        const ratioX = canvasWidth / clientWidth;
        const ratioY = canvasHeight / clientHeight;

        // Draw the cropped portion onto the temporary canvas
        tempContext.drawImage(
            this.canvas.canvas,
            ratioX * x, ratioY * y,
            ratioX * width, ratioY * height,
            0, 0,
            width, height
        );

        // Clear the original canvas
        this.canvas.clear();

        this.canvas.drawImage(tempCanvas);
    }

    destroy() {
        this.loader = null;
        super.destroy();
    }

}
