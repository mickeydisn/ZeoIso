import { assetConfig } from "./assetConfig.js";

export class AssetLoader {
    constructor(callback) {
        this.callback = callback;
        console.log('== Load Asset Tree == ')
        // this.loadAssetTree();
        this.assetTree = assetConfig;
        console.log(this.assetTree)
        console.log('== Load Asset Files == ')
        this.loadAssetFiles()
    }

    oneImageCallBack() {
        this.countLoad -= 1;
        if (this.countLoad == 0) {
            console.log("== End Load Image == ")
            this.callback()
        }
    }

    imageToCanvas(image) {
        const c = document.createElement("canvas");
        c.width = 256; // image.naturalWidth;
        c.height = 256; // image.naturalHeight;
        c.ctx = c.getContext("2d"); // attach context to the canvas for easy reference
        // cut the image ()
        if (image.naturalWidth == 512) {
            c.ctx.drawImage(image, 128, 128, 256, 256, 0, 0, 256, 256);
        } else {
            c.ctx.drawImage(image, 0, 0, 256, 256);
        }
        return c;
    }

    colorImage(dest, source, colorOffset) { // image is a canvas image
        dest.ctx.clearRect(0,0,dest.width, dest.height);
        dest.ctx.filter="hue-rotate("+(colorOffset.hue | 0)+"deg) saturate(" + colorOffset.saturation + "%) contrast(" + colorOffset.contrast + "%)";
        dest.ctx.drawImage(source,0, 0, dest.width, dest.height);
        return dest;
    }

    colorVariation(source, colorOffset) {
        const hue = colorOffset.hue ? colorOffset.hue : 0
        const saturation = colorOffset.saturation ? colorOffset.saturation : 100
        const contrast = colorOffset.contrast ? colorOffset.contrast : 100

        const dest = document.createElement("canvas");
        dest.width = 256; // image.naturalWidth;
        dest.height = 256; // image.naturalHeight;
        dest.ctx = dest.getContext("2d"); // attach context to the canvas for easy reference
        dest.ctx.filter="hue-rotate("+(hue | 0)+"deg) saturate(" + saturation + "%) contrast(" + contrast + "%)";
        dest.ctx.drawImage(source,0, 0, dest.width, dest.height);
        return dest        
    }

    loadAssetFiles() {
        this.countLoad = 0;
        
        Object.entries(this.assetTree).forEach(([itemLabel, item]) => {
            this.countLoad += 1;
            const image = new Image();
            image.onerror = function() {
                this.oneImageCallBack()
            }.bind(this)
            image.onload = function() {
                // this.assetTree[itemLabel].image = image
                const canva = this.imageToCanvas(image)
                // this.assetTree[itemLabel].cimage = canva
                this.assetTree[itemLabel].cimage = this.colorVariation(canva, {hue:150})

                this.oneImageCallBack()
            }.bind(this)
            image.src = item.src;

        })

        /*
        console.log("DRAW IMAGE")
        const p = this._translatePoint(Point(10, 10, 0))
        this.canvas.ctx.drawImage(image, p.x - 105, p.y - 142, 210, 210);
        */
    }

    old_loadAssetTree() {
        const assetTree = {
            tile: {src:"./img/asset/tower-defense-kit-1/tile_E.png"},

            pathA1: {src:"./img/asset/kenney_natureKit_2.1/crops_dirtDoubleRow_NW.png"},
            pathA2: {src:"./img/asset/kenney_natureKit_2.1/crops_dirtDoubleRow_SE.png"},
            pathA3: {src:"./img/asset/kenney_natureKit_2.1/crops_dirtDoubleRow_NE.png"},
            pathA4: {src:"./img/asset/kenney_natureKit_2.1/crops_dirtDoubleRow_SW.png"},
            rockA1: {src:"./img/asset/kenney_natureKit_2.1/rock_largeD_SE.png"},
            rockA2: {src:"./img/asset/kenney_natureKit_2.1/rock_tallA_SE.png"},
            rockA3: {src:"./img/asset/kenney_natureKit_2.1/rock_smallTopB_SE.png"},
            treeA1: {src:'./img/asset/fantasy-town-kit-1.0/tree_S.png'},
            treeB1: {src:"./img/asset/kenney_natureKit_2.1/tree_detailed_dark_NW.png"},
            treeB2: {src:"./img/asset/kenney_natureKit_2.1/tree_detailed_dark_SE.png"},
            treeB3: {src:"./img/asset/kenney_natureKit_2.1/tree_detailed_dark_NE.png"},
            treeB4: {src:"./img/asset/kenney_natureKit_2.1/tree_detailed_dark_SW.png"},
        }


        
        return assetTree;
    }


    loadAssetTree() {

        // List all files on main directory 
        const directory = "./img/asset/";
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', directory, false); // false for synchronous request
        xmlHttp.send(null);
        const ret = xmlHttp.responseText;
        const fileList = ret.split('\n');

        const listImage = [];
        fileList.forEach(x => {
            const attr = x.match(/^<li><a href=".*">(.*)<\/a>$/)
            if (attr) {
                var directory = "./img/asset/" + attr[1];
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open('GET', directory, false); // false for synchronous request
                xmlHttp.send(null);
                var ret = xmlHttp.responseText;
                var fileList = ret.split('\n');
                fileList.forEach(x => {
                    const attr = x.match(/^<li><a href=".*">(.*)<\/a>$/)
                    if (attr) {
                        listImage.push(directory + attr[1])
                    }
                })

            }
        })
        
        this.assetList = listImage
            .filter(path => path.endsWith('.png'))
            .map(path => {
                const splitPath = path.split('/')
                const dir = splitPath[splitPath.length - 2]
                const fileName = splitPath[splitPath.length - 1]
                const splitName = fileName.substring(0, fileName.length - 4)// .split('_')
                return [dir, splitName, {src:path}]
            })

        this.assetTree = Object.fromEntries(this.assetList.map(([dir, label, img]) => [label, img]))

    }


}