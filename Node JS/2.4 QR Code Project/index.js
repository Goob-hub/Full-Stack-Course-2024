/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

inquirer.prompt([
    {
        type: "input",
        name: "url",
        message: "Give me your URL so I can turn it into a QR code image!"
    }
  ])
  .then((answers) => {
    createFileAndQR(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Promt cant be loaded.")
    } else {
      // Something else went wrong
      console.log("IDK what the F U C K went wrong.", error);
    }
});

function createFileAndQR(data) {
    let url = data.url;
    fs.writeFile('QrURl.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    const qr_png = qr.image(url, { type: 'png' });

    qr_png.pipe(fs.createWriteStream('yourQRCode.png'));
}