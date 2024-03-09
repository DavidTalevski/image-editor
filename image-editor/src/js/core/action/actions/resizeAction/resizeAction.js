import Action from "../action";
import ActionType from "../../../enum/actionType.enum";
import { ImageLoader } from "../../../loader/imageLoader";

export default class ResizeAction extends Action {
    /**
     * @type {import("./resizeActionData").ResizeActionData}
     */
    data;

    title = "Resize Image";

    description = "";

    type = ActionType.RESIZE;

    loader = new ImageLoader();

    async execute() {
        super.execute();

        const data = this.canvas.getSaveData()
        const image = await this.loader.loadFromUrl(data);

        this.canvas.drawImage(image, this.data.width, this.data.height);
    }

    destroy() {
        this.loader = null;
        super.destroy();
    }
}
