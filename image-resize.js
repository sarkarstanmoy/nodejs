const sharp = require("sharp");
const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');


async function resizeImage() {
  try {

    //Reduce jpg image
    await sharp("assets/map-image.jpg", { limitInputPixels: false })
      .resize(1000)
      .toFormat("jpg", { mozjpeg: true })
      .toFile(`assets/map-image-${new Date().getTime()}.jpg`);

    //Reduce png image
    await sharp("assets/signatureedits.png", { limitInputPixels: false })
      .resize(800)
      .toFormat("png", { mozjpeg: true })
      .toFile(`assets/signatureedits-${new Date().getTime()}.png`);

    //Reduce heic image
    try {
      (async () => {
        const inputBuffer = await promisify(fs.readFile)('assets/dwsample.heic');
        const outputBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG'
        }).catch(error => {
          console.log("Error : ", error)
        });

        await sharp(outputBuffer, { limitInputPixels: false })
          .resize(800)
          .toFormat("jpg", { mozjpeg: true })
          .toFile(`assets/dwsample-${new Date().getTime()}.jpg`);
      })();
    } catch (error) {
      console.log("Error : ", error)
    }

  } catch (error) {
    console.log(error);
  }
}

resizeImage();