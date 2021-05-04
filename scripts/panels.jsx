/// <reference path="../node_modules/types-for-adobe/Photoshop/2015.5/index.d.ts"/>

/*
 * panels.psdの画像を一斉出力するPhotoShop用スクリプト
 */

const doc = app.activeDocument;

const panelsDir = new File($.fileName).parent.parent + '/public/img/panels/';

const layers = doc.layers[0].layers;

for (var i = 0; i < layers.length; i++) {
    layers[i].visible = false;
}

const opt = new PNGSaveOptions();
opt.interlaced = false;

for (var i = 0; i < layers.length; i++) {
    if (i > 0) layers[i - 1].visible = false;

    layers[i].visible = true;

    var fileName = layers[i].name + '.png';
    var filePath = new File(panelsDir + fileName);

    doc.saveAs(filePath, opt, true, Extension.LOWERCASE);
}

for (var i = 0; i < layers.length; i++) {
    layers[i].visible = true;
}

alert('Finished!');
