

export class ButtTileAction {
    constructor(GS, parentDiv, key, funcConf) {
        this.GS = GS;
        this.key = key;
        this._funcConf = funcConf;
        this.parentDiv = parentDiv;
        this.isActif = false;
        this.initDiv();
        this.GS.sub("WidjetActions.currentButt", "ButtTileActionAsset_" + key, 
            this.updateCurrentAction.bind(this))
    }
    
    get funcConf () { return  this._funcConf }

    updateCurrentAction(buttObj) {
       
        if (this !== buttObj) {
            this.isActif = false;
            this.mainDiv.style('border-color', "#AEAEAE")
        } else {
            this.isActif = true;
            this.mainDiv.style('border-color', "#363636")
        }
    }

    initDiv() {
        this.mainDiv = this.parentDiv.append('div')
            .classed('cell', true)
            .on('click', _ => this.click())
        this.mainDiv.style('border-color', "#AEAEAE")

        this.label = this.mainDiv.append('div')
            .classed('label', true)
            .text(this.key);
    }

    click() {
        const curentSize = this.GS.get("WidjetActions.currentSize")
        this.GS.set("TileClickFunction", {...this.funcConf, size : curentSize })
        this.GS.set("WidjetActions.currentButt", this)
    }
}


export class ButtTileActionSelect extends ButtTileAction {
    constructor(GS, parentDiv, key, funcConf) {
        super(GS, parentDiv, key, funcConf)
        
        this.currentState = 0
        // this.p1 = null
        // this.p2 = null
    }

    get funcConf() {
        this._funcConf.state = this.currentState;
        this.currentState = (this.currentState + 1 ) % 2
        this.label.text(this.key + ' _' + this.currentState + '_')

        return this._funcConf;
    }

    click() {
        this.state = 0;
        this.label.text(this.key + ' _0_')
        this.GS.set("WidjetActions.currentButt", this)
    }

}



export class ButtTileActionAsset extends ButtTileAction {
    constructor(GS, parentDiv, key, funcConf) {
        super(GS, parentDiv, key, funcConf)
        
        this.GS.sub("WidjetAssetList.currentAssetCanvas", "ButtTileActionAsset_" + key, 
            this.updateSelectedAssetCanvas.bind(this))
        this.GS.sub("WidjetAssetList.currentAssetKey", 'ButtTileActionAsset_' + key, assetKey => {
            if( this.isActif ) {
                console.log('ActifClik', assetKey)
                this._funcConf.assetKey = assetKey
                this.GS.set("TileClickFunction", {...this._funcConf})
            }
        })

    }

    get funcConf() {
        this._funcConf.assetKey = this.GS.get("WidjetAssetList.currentAssetKey");
        return this._funcConf;
    }

    initDiv() {
        super.initDiv()
        this.contentCanvas = this.mainDiv.append("canvas")
                .attr("height", 64)
                .attr("width", 64)

        this.updateCanvas();
    }

    updateSelectedAssetCanvas(canvas) {
        this.selectedAsssetCanvas = canvas;
        this.updateCanvas()
    }

    updateCanvas() {
        if (this.selectedAsssetCanvas) {
            const ctx = this.mainDiv.select('canvas').node().getContext('2d')
            ctx.clearRect(0, 0, 64, 64)
            // ctx.fillStyle = "green";
            // ctx.fillRect(0, 0, 64, 64)
            ctx.drawImage(this.selectedAsssetCanvas, 0, 0, 256, 256, 0, 0, 64, 64);
        } else {
            const ctx = this.mainDiv.select('canvas').node().getContext('2d')
            ctx.clearRect(0, 0, 64, 64)
            // ctx.fillStyle = "red";
            // ctx.fillRect(0, 0, 64, 64)
        }
    }

}
