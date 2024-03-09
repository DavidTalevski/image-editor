import Action from "../action";
import ActionType from "../../../enum/actionType.enum";

export default class RotateAction extends Action {
    /**
     * @type {import("./rotateActionData").RotateActionData}
     */
    data;

    title = "Rotate Image";

    type = ActionType.ROTATE;

    async execute() {
        super.execute();

        this.description = `Rotate by ${this.data.degrees} degrees`;

        this.rotate(this.data.degrees)
    }

    /**
     * @param {number} degrees 
     */
    rotate(degrees) {
        const context = this.canvas.getContext();

        // Convert degrees to radians
        const radians = (degrees * Math.PI) / 180;

        const width = context.canvas.width;
        const height = context.canvas.height;

        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        // Calculate new dimensions after rotation
        const newWidth = Math.abs(cos * width) + Math.abs(sin * height);
        const newHeight = Math.abs(sin * width) + Math.abs(cos * height);

        // Create a temporary canvas to hold the rotated image
        const tempCanvas = this.getTemporaryCanvas(newWidth, newHeight);
        const tempContext = tempCanvas.getContext('2d');

        // Clear the temporary canvas
        tempContext.clearRect(0, 0, newWidth, newHeight);

        // Translate and rotate the temporary context
        tempContext.translate(newWidth / 2, newHeight / 2);
        tempContext.rotate(radians);

        // Draw the image onto the temporary canvas
        tempContext.drawImage(context.canvas, -width / 2, -height / 2);

        this.canvas.clear();

        this.canvas.drawImage(tempCanvas)
    }

    /**
     * @param {number} width 
     * @param {number} height 
     */
    getTemporaryCanvas(width, height) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;

        return tempCanvas;
    }

}
