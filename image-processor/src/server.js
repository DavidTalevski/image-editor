const express = require('express');
const bodyParser = require('body-parser');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const upscaler = require("./upscaler/upscaler");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));

const imagesFolder = path.join(__dirname, '../images');

app.post('/upscale', async (req, res) => {
    try {
        const imageData = req.body.image;
        const md5Hash = req.body.MD5Hash;
        const imagePath = path.join(imagesFolder, `${md5Hash}.jpg`);
        const tempImagePath = path.join(imagesFolder, `${md5Hash}_temporary.jpg`);

        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        }

        const buffer = Buffer.from(imageData, 'base64');

        // const upscaledImageBuffer = await sharp(buffer)
        //     .resize({ width: 1024, height: 1024 })
        //     .toBuffer();

        fs.writeFileSync(tempImagePath, buffer);

        await upscaler.upscale(tempImagePath, imagePath);

        res.sendFile(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
