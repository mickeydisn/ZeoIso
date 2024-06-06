import { assetOptiConfig } from "./assetOptiConfig.js";
import * as AssetUtils from "./assetUtils.js";

export class AssetLoaderOpti {
    constructor(callback) {
        this.callback = callback;
        console.info('== Load Asset Tree == ')
               
        this.assetList = assetOptiConfig;
        this.assetTree = {}
        // this.assetTree = Object.fromEntries(this.assetList.map(assetConf => [assetConf.label, assetConf]))

        console.info('== Load Asset Files == ')
        this.loadAssetFiles()
    }



    loadAssetFiles() {
        this.countLoad = 0;
        
        this.assetList.forEach(assetInfo => {
            console.log(assetInfo)
            this.countLoad += 1;
            const image = new Image();
            image.onerror = function() {
                this.oneImageCallBack()
            }.bind(this)
            image.onload = function() {
                // this.assetTree[itemLabel].image = image
                const canva = this.imageToCanvas(image)

                this.loadAssetImage(assetInfo, image)
                
                this.oneImageCallBack()
            }.bind(this)
            image.src = assetInfo.src;

        })

        /*
        const p = this._translatePoint(Point(10, 10, 0))
        this.canvas.ctx.drawImage(image, p.x - 105, p.y - 142, 210, 210);
        */
    }

    oneImageCallBack() {
        this.countLoad -= 1;
        if (this.countLoad == 0) {
            console.info("== End Load Image == ")
            this.callback()
        }
    }

    imageToCanvas(image) {
        const w = image.naturalWidth
        const h = image.naturalHeight

        const c = document.createElement("canvas");
        c.width = w
        c.height = h
        c.ctx = c.getContext("2d", { willReadFrequently: true }); // attach context to the canvas for easy reference
        c.ctx.drawImage(image, 0, 0, w, h);
        return c;
    }



    loadAssetImage(assetInfo, sourceImg) {

        const wCutSize = 256 - 64
        const hCutSize = 256 - 32

        assetInfo.images.map((info, idx) => {

            const __cutImage = (wId , hId)  => {

                const dest = document.createElement("canvas");
                dest.width = 256; ;
                dest.height = 256; ;
                dest.ctx = dest.getContext("2d", { willReadFrequently: true });
                // Draw the cut portion of the source image onto the destination canvas
                dest.ctx.drawImage(
                    sourceImg, 
                    wCutSize * wId, hCutSize * hId, wCutSize, hCutSize, 
                    32, 0, wCutSize, hCutSize
                );
                // dest.ctx.drawImage(cutImg,0, 0, dest.width, dest.height);
                return dest
            }

            this.assetTree[info.label + '_NE'] =  {
                "group": assetInfo.group,
                "label": info.label + '_NE',
                "cimage": __cutImage(0, idx)
            }
            this.assetTree[info.label + '_NW'] =  {
                "group": assetInfo.group,
                "label": info.label + '_NW',
                "cimage": __cutImage(1, idx)
            }
            this.assetTree[info.label + '_SW'] =  {
                "group": assetInfo.group,
                "label": info.label + '_SW',
                "cimage": __cutImage(2, idx)
            }
            this.assetTree[info.label + '_SE'] =  {
                "group": assetInfo.group,
                "label": info.label + '_SE',
                "cimage": __cutImage(3, idx)
            }

            if (info['8axes']) {
                this.assetTree[info.label + '_N'] =  {
                    "group": assetInfo.group,
                    "label": info.label + '_N',
                    "cimage": __cutImage(4, idx)
                }
                this.assetTree[info.label + '_W'] =  {
                    "group": assetInfo.group,
                    "label": info.label + '_W',
                    "cimage": __cutImage(5, idx)
                }
                this.assetTree[info.label + '_S'] =  {
                    "group": assetInfo.group,
                    "label": info.label + '_S',
                    "cimage": __cutImage(6, idx)
                }
                this.assetTree[info.label + '_E'] =  {
                    "group": assetInfo.group,
                    "label": info.label + '_E',
                    "cimage": __cutImage(7, idx)
                }
    
            }

        })
    }

    /* 
    
    */

    colorImage(dest, source, colorOffset) { // image is a canvas image
        dest.ctx.clearRect(0,0,dest.width, dest.height);
        dest.ctx.filter="hue-rotate("+(colorOffset.hue | 0)+"deg) saturate(" + colorOffset.saturation + "%) contrast(" + colorOffset.contrast + "%)";
        dest.ctx.drawImage(source,0, 0, dest.width, dest.height);
        return dest;
    }



    getAsset(key) {
        if (this.assetTree[key]) {
            return this.assetTree[key].cimage
            
        } else {
            const [keyParent, canvasFilter] = key.split('#')
            if (this.assetTree[keyParent]) {

                const parentCimage = this.assetTree[keyParent].cimage
                const canvasFilterConf = AssetUtils.canvasFilterStrToValue(canvasFilter)
                const newCimage = AssetUtils.colorVariation(parentCimage, canvasFilterConf)
                this.assetTree[key] = {cimage: newCimage}
                return this.assetTree[key].cimage
            }
        }
    }
 

}



