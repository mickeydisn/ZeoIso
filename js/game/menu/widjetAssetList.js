import * as AssetUtils from "../asset/assetUtils.js" 
import { ButtTileActionAsset } from "./widjetBtt.js";


import { WidjetActions } from "./widjetAction.js";

export class WidjetAssetList extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)

        this._createMainButt('tileAsset', '🏡')

        this.mainControl = 'NatureTree'
        this.colorOffset = {...AssetUtils.CANVAS_FILTER_DEFAULT_IDX};
        this.mainOffset = {x: 0, y:0, z:0};
        this.currentAssetCanvas = null;
        this.selectAssetKey = null;

        this.mainDiv.attr('id', 'mainDiv')

        this.content = this.mainDiv.select('#content')
            
        // --------------------------------


        {


            this.content.append('div').classed('row', true).classed('title', true).text("= ASSET ACTION =")
        

            this.content.append('div').classed('row', true).classed('subtitle', true)
                .text("Asset Actions:")

            this.firstAction = new ButtTileActionAsset(this.GS, this.content, "Place", {func:"itemForceKey"})
            new ButtTileActionAsset(this.GS, this.content, "Add", {func:"itemAddKey"})
            this.content.append('div').classed('cell', true)
            this.content.append('div').classed('cell', true)
        }

        this.boxAssetSelected = this.content.append('div')
            .classed('row', true)
            .attr('id', 'boxAssetSelected')

        this.boxItemListHeader = this.content.append('div')
            .classed('row', true)
            .classed('listAssetHeader', true)

        this.boxItemList = this.content.append('div')
            .classed('row', true)
            .classed('listAsset', true)

        this.drawUpdate();


        { // First action . 
            const changeInput = this.mainDiv.select('#checkbox_menuBox_tileAsset')
            changeInput.on('change', e => {
                if (changeInput.property('checked') && this.firstAction) {
                    this.firstAction.click()
                }
            })
        }


        this.GS.set('WidjetAssetList.isVisibel', false)
        this.GS.sub('WidjetAssetList.isVisibel', 'WidjetAssetList', this.setIsVisibel.bind(this))

    }

    setIsVisibel(isVisibel) {
        console.log('visible', isVisibel)
        this.mainDiv.select('#checkbox_menuBox_tileAsset').property('checked', isVisibel)
    }


    get currentAssetCanvas() { return this._currentAssetCanvas }
    set currentAssetCanvas(canvas) {
        this.GS.set("WidjetAssetList.currentAssetCanvas", canvas)
        
        this._currentAssetCanvas = canvas
    }

    get currentAssetKey() { return this._currentAssetKey }
    set currentAssetKey(key) {
        this.GS.set("WidjetAssetList.currentAssetKey", key)
        this._currentAssetKey = key
    }

    drawUpdate() {
        this.drawGroupItemList()
        this.drawItemList()
        this.drawCurrentSelect()
    }


    // ---------------------
    // GROUP ItemList 
    // ---------------------


    _createGroupItemListButton(box, control) {
        const b = box.append('div')//.classed('headerSelectBox', true)
        if (this.mainControl == control ) {
            b.style('border', '5px solid #666')
        }
        b.on('click', _ => {
            this.mainControl =  this.mainControl == control ? null : control; 
            this.drawUpdate();
        })
        return b;
    }


    drawGroupItemList() {
        this.boxItemListHeader.selectAll('div').remove()
        this.boxItemListHeader.append('div')
            .attr('id', 'titleAssetHeader')
            .text(" > " + this.mainControl)

        const boxList = this.boxItemListHeader.append('div')
            .classed('headerList', true);

        [...new Set(
            this.assetLoader.assetList
                .map(assetConf => assetConf.group)) 
        ].forEach(e => {
            this._createGroupItemListButton(boxList, e).text(e)
        });
    }

    // ---------------------
    // GROUP ItemList 
    // ---------------------

    drawItemList() {
        this.boxItemList.selectAll('div').remove()

        const assetList = Object.entries(this.assetLoader.assetTree).map( ([_, v]) => v)
        
         const group = assetList
            .filter((assetConf) => {
                if (!assetConf.group) return false
                const checkMainSelect = 
                    assetConf.group.endsWith(this.mainControl) 
                return checkMainSelect
            })
            .reduce((rv, assetConf) => {
                const glabel = assetConf.label.split('_')[0]
                rv[glabel] = rv[glabel] || []
                rv[glabel].push(assetConf);
                return rv;
            }, {});

        Object.entries(group).forEach(([glabel, assetConfs]) => {
            this.boxItemList.append('div').text(glabel)

            assetConfs.forEach(assetConf => {
                const src = assetConf.src
                const contentImg = this.boxItemList
                    .append('div')
                        .classed('cell', true)
                        .append('div')
                            .classed('contentImg', true)
      
                /*
                contentImg.append('img')
                        .attr('src', src)
                        .style('width', '64px')
                        .style('height', '64px')
                        .style('zoom', '2.5')
                */
                const canvas = contentImg.append('canvas')
                    .attr('width', '64px')
                    .attr('height', '64px')
                const ctx = canvas.node().getContext("2d")
                // Draw the cut portion of the source image onto the destination canvas
                ctx.drawImage(
                    assetConf.cimage, 
                    42 , 42, 255 - 84, 255 - 64, 
                    0, 0, 64, 64
                );
                
                contentImg.on('click', function(_) {
                    console.log("=== CLICK ", assetConf.label)
                    this.selectAssetKey = assetConf.label;
                    this.drawCurrentSelect()
                }.bind(this))
            })

        })
    }    

    


    // ---------------------
    // CURENT SELECT TILE
    // ---------------------

    drawCurrentSelect() {
        this.boxAssetSelected.selectAll('div').remove()


        this.boxAssetSelected.append('div')
            .classed('title', true)
            .text('Current Select:')

        const content = this.boxAssetSelected.append('div')
            .classed('contentAsset', true)

        const B = content.append('div')
            .classed('selector', true)
        const C = content.append('div')
            .classed('selector', true)

        this.createHeaderOffsetButton(B, "Height", this.mainOffset, 'z', AssetUtils.RANGE_HEIGHT)
        // C.append('hr')


        C.append('div')
            .on('click', _ => {
                this.colorOffset = {...AssetUtils.CANVAS_FILTER_DEFAULT_IDX};
                // this.drawHeader();
                this.drawCurrentSelect();
            })
            .html('<div class="lable"></div><div class="buttClear">Clear</div>')


        this.createHeaderOffsetButton(C, "Hue:", this.colorOffset, 'hue', AssetUtils.RANGE_HUE)
        this.createHeaderOffsetButton(C, "Sat:", this.colorOffset, 'saturation', AssetUtils.RANGE_SATURATION)
        this.createHeaderOffsetButton(C, "Con:", this.colorOffset, 'contrast', AssetUtils.RANGE_CONTRAST)
        this.createHeaderOffsetButton(C, "Bri:", this.colorOffset, 'brightness', AssetUtils.RANGE_BRIGHTNESS)
        
        this.createHeaderOffsetButton(C, "INV:", this.colorOffset, 'invert', AssetUtils.RANGE_INVERT)
        // this.createHeaderOffsetButton(C, "DOW:", this.colorOffset, 'shadow', RANGE_SHADOW)


        const canvasBox = B.append('div')
            .style('display', 'inline-block')
            .style('border', '1px solid #000')
            .style('min-height', '128px')
            .style('min-width', '128px')
               .append('div')

        if (this.assetLoader.assetTree[this.selectAssetKey]) {
            let cimage = this.assetLoader.assetTree[this.selectAssetKey].cimage
            
            // z : RANGE_HEIGHT[this.colorOffset.z],
            const colorConfig = AssetUtils.canvasFilterIdxToValue(this.colorOffset)
            const currentAssetCanvas =  AssetUtils.colorVariation(cimage, colorConfig)

            const colorFilter = AssetUtils.canvasFilterValueToStr(colorConfig)
            this.currentAssetKey = colorFilter ? this.selectAssetKey + '#' + colorFilter :  this.selectAssetKey

            const canvas = canvasBox.append('canvas')
                .attr('width', '128px')
                .attr('height', '128px')
            const ctx = canvas.node().getContext("2d")
            ctx.drawImage(currentAssetCanvas, 32, 32, 192, 192, 0, 0, 128, 128);

            this.currentAssetCanvas = currentAssetCanvas
        }        

    }

    createHeaderOffsetButton(box, label, config, key, range) {

        const boxContent = box.append('div')
        
        boxContent.append('div')
            .classed('lable', true)
            .text(label)

        const g = boxContent.append('div')
            .classed('input', true)

        const add_dr = (tag , f) => {
            const bb = g.append('div')
                .classed('clickBox', true)
                .text(tag)
            bb.on('click', _ => {
                f();
                this.drawUpdate();
            })
        }
        add_dr('-', _ => {
            config[key] = config[key] <= 0 ? 0 : config[key] - 1
        })

        g.append('div').classed('centerBox', true).text('' + range[config[key]])

        add_dr('+', _ => {
            config[key] = config[key] >= range.length - 1 ? range.length - 1 : config[key] + 1
        })
    }


    // ---------------------
    // 
    // ---------------------


    // ---------------------
    // 
    // ---------------------

}



