import { ImageEditor } from "./core/imageEditor";

document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('uploadInput');

    const editor = new ImageEditor();

    uploadInput.addEventListener('change', (e) => {
        editor.loadAndShowImage(e)
    });
});