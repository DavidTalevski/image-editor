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

        console.log(this.data);

        this.cropAndDrawOnOriginal(this.data.x, this.data.y, this.data.width, this.data.height)
    }

    cropAndDrawOnOriginal(x, y, width, height) {
        // Create a temporary canvas to hold the cropped image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;

        // Get the 2D context of the source canvas and temporary canvas
        const tempContext = tempCanvas.getContext('2d');

        const ratioX = this.canvas.getWidth() / this.canvas.getClientWidth();
        const ratioY = this.canvas.getHeight() / this.canvas.getClientHeight();

        // Draw the cropped portion onto the temporary canvas
        tempContext.drawImage(this.canvas.canvas, ratioX * x, ratioY * y, ratioX * width, ratioY * height, 0, 0, width, height);

        // Clear the original canvas
        this.canvas.clear();

        this.canvas.drawImage(tempCanvas);
    }

    destroy() {
        this.loader = null;
        super.destroy();
    }

}
