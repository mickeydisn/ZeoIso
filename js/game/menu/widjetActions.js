

export class WidjetActions {

    constructor(world, mainDiv) {
        this.world = world;
        this.GS = this.world.globalState;
        
        console.log('=== WidjetAssetList - Init')

        this.mainDiv = mainDiv
        this.mainOffset = {x: 0, y:0, z:0};
        this.currentImage = null;
        this.currentSize = 3;
        this.GS.set("WidjetActions.currentSize", this.currentSize)


        // Create Switch Button 
        this.mainDiv.html( `
<div class="buttMenuBox  switch" id="floorAction">
        <input type="checkbox" id="checkbox_menuBox_floorAction", name="MenuBox">
        <label for="checkbox_menuBox_floorAction">🏗</label>
        <div class="widjetMenuBox slider" id="floorAction" >
            <div id="content" class="floorAction">  </div>

        </div>
</div>
        `)

        // Generate Content 
        {
            this.contentBox = this.mainDiv.select('#content')
            this.drawFloorActionList();

        }
        // Sub to Global state. 
       
    }



    // ---------------------
    //  Floor Action 
    // ---------------------
    drawFloorActionList() {
        this.contentBox.selectAll('div').remove()


        this.contentBox.append('div').classed('row', true).text("Asset Actions")
        new ButtTileActionAsset(this.GS, this.contentBox, "Place", {func:"itemForceKey"})
        new ButtTileActionAsset(this.GS, this.contentBox, "Add", {func:"itemForceKey"})
        new ButtTileActionAsset(this.GS, this.contentBox, "Stack", {func:"itemForceKey"})
        this.contentBox.append('div').classed('cell', true)

        this.contentBox.append('div').classed('row', true).text("SIZE SELECTOR")

        const sizeInput = this.contentBox.append('div').classed('row', true).classed('input', true)
            .html(`
        <div class="clickBox" id="remove">-</div>
        <div class="centerBox" id="label">${this.currentSize}</div>
        <div class="clickBox" id="add">+</div>
        `)

        sizeInput.select('#remove').on('click', _ => {
            this.currentSize = this.currentSize > 1 ? this.currentSize - 2 : this.currentSize;
            sizeInput.select('#label').text(this.currentSize);
            this.GS.set("WidjetActions.currentSize", this.currentSize)

        })
        sizeInput.select('#add').on('click', _ => {
            this.currentSize = this.currentSize + 2;
            sizeInput.select('#label').text(this.currentSize);
            this.GS.set("WidjetActions.currentSize", this.currentSize)
        })

        this.contentBox.append('div').classed('row', true).text("Clear Actions")
        new ButtTileAction(this.GS, this.contentBox, "Clear Item", {func:"clearItemSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Clear Color", {func:"clearColorSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Clear Lvl", {func:"clearLvlSquare", size:1})
        this.contentBox.append('div').classed('cell', true)

        this.contentBox.append('div').classed('row', true).text("Lvl Actions")
        new ButtTileAction(this.GS, this.contentBox, "Up", {func:"lvlUpSquare", size:1, lvl:1})
        new ButtTileAction(this.GS, this.contentBox, "Down", {func:"lvlUpSquare", size:1, lvl:-1})
        new ButtTileAction(this.GS, this.contentBox, "Flat", {func:"lvlFlatSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Smoth", {func:"lvlAvgSquare", size:1})

        this.contentBox.append('div').classed('row', true).text("Color Actions")
        
        const colorGrid = this.contentBox
            .append('div').classed('row', true)
            .append('div').classed('smalGrid', true);

        [...Array(12)].forEach((_, idx) => {
            const l = Math.floor(idx * (100 / 12))
            const c = d3.rgb(`hsl(0, 0%, ${l}%)`) 
            colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`)                
        });            
    

        [...Array(12)].forEach((_, idx) => {
            const hue =  Math.floor(idx * (360 / 12))
            const c = d3.rgb(`hsl(${hue}, 100%, 75%)`) 
            colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`)                
        });            
    
        [...Array(12)].forEach((_, idx) => {
            const hue =  Math.floor(idx * (360 / 12))
            const c = d3.rgb(`hsl(${hue}, 100%, 50%)`) 
            colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`)                
        });            

        [...Array(12)].forEach((_, idx) => {
            const hue =  Math.floor(idx * (360 / 12))
            const c = d3.rgb(`hsl(${hue}, 100%, 25%)`) 
            colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`)                
        });            

    }

}



class ButtTileAction {
    constructor(GS, parentDiv, key, funcConf) {
        this.GS = GS;
        this.key = key;
        this._funcConf = funcConf;

        this.parentDiv = parentDiv;
        this.mainDiv = this.parentDiv.append('div')
            .classed('cell', true)
            .on('click', _ => this.click())
        this.mainDiv.style('border-color', "#AEAEAE")

        this.initDiv();

        this.GS.sub("WidjetActions.currentActionKey", "ButtTileActionAsset_" + key, 
            this.updateCurrentAction.bind(this))
    }
    
    get funcConf () { return  this._funcConf }

    updateCurrentAction(key) {
        if (this.key != key) {
            this.mainDiv.style('border-color', "#AEAEAE")
        }
    }

    initDiv() {
        this.mainDiv.append('div')
            .classed('label', true)
            .text(this.key);
    }

    click() {
        this.mainDiv.style('border-color', "#363636")
        this.GS.set("WidjetActions.currentActionKey", this.key)
        this.GS.set("WidjetActions.currentButt", this)
    }
}


class ButtTileActionAsset extends ButtTileAction {
    constructor(GS, parentDiv, key, funcConf) {
        super(GS, parentDiv, key, funcConf)
        
        this.GS.sub("WidjetAssetList.currentAssetCanvas", "ButtTileActionAsset_" + key, 
            this.updateSelectedAssetCanvas.bind(this))
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
        console.log('updateSelectedAssetCanvas', canvas)
        this.updateCanvas()
    }

    updateCanvas() {
        
        if (this.selectedAsssetCanvas) {
            const ctx = this.mainDiv.select('canvas').node().getContext('2d')
            ctx.clearRect(0, 0, 64, 64)
            ctx.drawImage(this.selectedAsssetCanvas, 0, 0, 256, 256, 0, 0, 64, 64);
        } else {
            const ctx = this.mainDiv.select('canvas').node().getContext('2d')
            ctx.clearRect(0, 0, 64, 64)
        }
    }

    click() {
        this.mainDiv.style('border-color', "#363636")
        this.GS.set("WidjetActions.currentActionKey", this.key)
        this.GS.set("WidjetActions.currentButt", this)
    }
}