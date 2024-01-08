import Action from "../action";
import ActionType from "../../../enum/actionType.enum";
import { ImageLoader } from "../../../loader/imageLoader";

export default class ResizeAction extends Action {
    /**
     * @type {import("./resizeActionData").ResizeActionData}
     */
    data;

    title = "Resize Image";

    type = ActionType.RESIZE;

    loader = new ImageLoader();


    async execute() {
        super.execute();

        const image = await this.loader.loadFromUrl(this.canvas.getSaveData());

        this.canvas.drawImage(image, this.data.width, this.data.height);
    }

    destroy() {
        this.loader = null;
        super.destroy();
    }
}
