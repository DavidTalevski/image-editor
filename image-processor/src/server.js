const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const upscaler = require("./upscaler/upscaler");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));

const imagesFolder = path.join(__dirname, '../images');

// Check if the images folder exists, if not create an empty images folder
if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder);
}

app.post('/upscale', async (req, res) => {
    try {
        const imageData = req.body.image;
        const md5Hash = req.body.MD5Hash;
        const settings = req.body.settings;

        const fileName = `${md5Hash}-${objectToString(settings)}`;
        const imagePath = path.join(imagesFolder, `${fileName}.jpg`);
        const tempImageName = `${fileName}_temporary.jpg`;
        const tempImagePath = path.join(imagesFolder, tempImageName);

        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        }

        const buffer = Buffer.from(imageData, 'base64');

        fs.writeFileSync(tempImagePath, buffer);

        await upscaler.upscale(tempImagePath, imagePath, settings);

        res.sendFile(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function objectToString(obj) {
    let result = '';

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += `${obj[key]},`;
        }
    }

    result = result.slice(0, -1);

    return result;
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
