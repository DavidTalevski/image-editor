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

        const originalWidth = context.canvas.width;
        const originalHeight = context.canvas.height;

        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        // Calculate new dimensions after rotation
        const newWidth = Math.abs(cos * originalWidth) + Math.abs(sin * originalHeight);
        const newHeight = Math.abs(sin * originalWidth) + Math.abs(cos * originalHeight);

        // Create a temporary canvas to hold the rotated image
        const tempCanvas = this.getTemporaryCanvas(newWidth, newHeight);
        const tempContext = tempCanvas.getContext('2d');

        // Clear the temporary canvas
        tempContext.clearRect(0, 0, newWidth, newHeight);

        // Translate and rotate the temporary context
        tempContext.translate(newWidth / 2, newHeight / 2);
        tempContext.rotate(radians);

        // Draw the image onto the temporary canvas
        tempContext.drawImage(context.canvas, -originalWidth / 2, -originalHeight / 2);

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
