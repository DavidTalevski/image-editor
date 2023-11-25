export class ImageDownloader {
    constructor() {

    }

    download() {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'canvas_image.png';
        link.click();
    }
}