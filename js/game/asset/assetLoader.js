import { assetConfig } from "./assetConfig.js";
import * as AssetUtils from "../asset/assetUtils.js" 

export class AssetLoader {
    constructor(callback) {
        this.callback = callback;
        console.log('== Load Asset Tree == ')
        

        // 
        // this.loadAssetTree();
        //console.log(this.assetList)
        
        this.assetList = assetConfig;

        this.assetTree = Object.fromEntries(this.assetList.map(assetConf => [assetConf.label, assetConf]))

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
        if (image.naturalWidth == 512 && image.naturalHeight == 512) {
            c.ctx.drawImage(image, 128, 128, 256, 256, 0, 0, 256, 256);
        } if (image.naturalWidth == 256 && image.naturalHeight == 256) {
            c.ctx.drawImage(image, 0, 0, 256, 256);
        } else {
            // const [w, h] = [image.naturalWidth, image.naturalHeight]
        }
        return c;
    }

    colorImage(dest, source, colorOffset) { // image is a canvas image
        dest.ctx.clearRect(0,0,dest.width, dest.height);
        dest.ctx.filter="hue-rotate("+(colorOffset.hue | 0)+"deg) saturate(" + colorOffset.saturation + "%) contrast(" + colorOffset.contrast + "%)";
        dest.ctx.drawImage(source,0, 0, dest.width, dest.height);
        return dest;
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
                this.assetTree[itemLabel].cimage = canva
                // this.assetTree[itemLabel].cimage = AssetLoader.colorVariation(canva, {hue:150})

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

    getAsset(key) {
        if (this.assetTree[key]) {
            return this.assetTree[key].cimage
            
        } else {
            const [keyParent, canvasFilter] = key.split('#')
            if (this.assetTree[keyParent]) {
                // console.log('-Create New FilterColor Asset ')

                const parentCimage = this.assetTree[keyParent].cimage
                const canvasFilterConf = AssetUtils.canvasFilterStrToValue(canvasFilter)
                const newCimage = AssetUtils.colorVariation(parentCimage, canvasFilterConf)
                this.assetTree[key] = {cimage: newCimage}
                return this.assetTree[key].cimage
            }
        }
    }
 
    // ------------------------------------------------------------
    // Asset Loader
    // ------------------------------------------------------------

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
                return {src:path, group:dir, label:splitName}
            })

        console.log('========= assetList ==========')
        console.log(this.assetList)

        console.log('==============================')

    }


}



