

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
        <input type="radio" id="checkbox_menuBox_floorAction" name="MenuBox">
        <label for="checkbox_menuBox_floorAction">🏗</label>
        <div class="widjetMenuBox slider" id="floorAction" >
            <div id="content" class="menuAction">  </div>
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

        // --------------------------------

        // --------------------------------
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


        // --------------------------------

        this.contentBox.append('div').classed('row', true).text("Clear Actions")
        new ButtTileAction(this.GS, this.contentBox, "Clear Item", {func:"clearItemSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Clear Color", {func:"clearColorSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Clear Lvl", {func:"clearLvlSquare", size:1})
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        // --------------------------------
        this.contentBox.append('div').classed('row', true).text("Lvl Actions")
        new ButtTileAction(this.GS, this.contentBox, "Up", {func:"lvlUpSquare", size:1, lvl:1})
        new ButtTileAction(this.GS, this.contentBox, "Down", {func:"lvlUpSquare", size:1, lvl:-1})
        this.contentBox.append('div').classed('cell', true).classed('empty', true)
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        new ButtTileAction(this.GS, this.contentBox, "Smoth", {func:"lvlAvgSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Flat", {func:"lvlFlatSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Smoth\nBorder", {func:"lvlAvgBorder", size:1})
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        // --------------------------------

        this.contentBox.append('div').classed('row', true).text("Color Actions")
        
        new ButtTileActionColor(this.GS, this.contentBox, "Color", {func:"colorSquare", sire:1, color:[0,0,0]})
     
    }

}



export class ButtTileAction {
    constructor(GS, parentDiv, key, funcConf) {
        this.GS = GS;
        this.key = key;
        this._funcConf = funcConf;

        this.parentDiv = parentDiv;

        this.initDiv();

        this.GS.sub("WidjetActions.currentButt", "ButtTileActionAsset_" + key, 
            this.updateCurrentAction.bind(this))
    }
    
    get funcConf () { return  this._funcConf }

    updateCurrentAction(buttObj) {
       
        if (this !== buttObj) {
            this.mainDiv.style('border-color', "#AEAEAE")
        } else {
            this.mainDiv.style('border-color', "#363636")
        }
    }

    initDiv() {
        this.mainDiv = this.parentDiv.append('div')
            .classed('cell', true)
            .on('click', _ => this.click())
        this.mainDiv.style('border-color', "#AEAEAE")

        this.mainDiv.append('div')
            .classed('label', true)
            .text(this.key);
    }

    click() {
        this.GS.set("WidjetActions.currentButt", this)
    }
}




class ButtTileActionColor extends ButtTileAction {
    constructor(GS, parentDiv, key, funcConf) {
        super(GS, parentDiv, key, funcConf)
        
        /*
        this.GS.sub("WidjetAssetList.currentAssetCanvas", "ButtTileActionAsset_" + key, 
            this.updateSelectedAssetCanvas.bind(this))
            */

        this.selectedDivColor = null;
        this.selectedColor = {r:0, g:0, b:0};
    }

    updateCurrentAction(buttObj) {
        if (this !== buttObj) {
            if (this.selectedDivColor) this.selectedDivColor.style("border-color", "#AEAEAE");
            this.selectedDivColor = null
        } else {
            // this.mainDiv.style('border-color', "#363636")
        }
    }

    updateButtColorSelected(bColor) {
        if (this.selectedDivColor) this.selectedDivColor.style("border-color", "#AEAEAE");
        this.selectedDivColor = bColor
        if (this.selectedDivColor) this.selectedDivColor.style("border-color", "#363636");
    }
    
    get funcConf() {
        const c = this.selectedColor
        this._funcConf.color = [c.r, c.g, c.b];
        return this._funcConf;
    }
    

    initDiv() {

        const _addClick = (bColor, color) => {
            bColor.on('click', _ => {
                this.updateButtColorSelected(bColor)
                this.selectedColor = color
                this.click()
            })
                
        }

        this.colorGrid = this.parentDiv
            .append('div').classed('row', true)
            .append('div').classed('smalGrid', true);

        [...Array(12)].forEach((_, idx) => {
            const l = Math.floor(idx * (100 / 12))
            const c = d3.rgb(`hsl(0, 0%, ${l}%)`) 

            const bColor = this.colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`);                
            _addClick(bColor, c);
                            
        });            


        [...Array(12)].forEach((_, idx) => {
            const hue =  Math.floor(idx * (360 / 12))
            const c = d3.rgb(`hsl(${hue}, 50%, 75%)`) 
            const bColor = this.colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`);                
            _addClick(bColor, c);
        });            

        [...Array(12)].forEach((_, idx) => {
            const hue =  Math.floor(idx * (360 / 12))
            const c = d3.rgb(`hsl(${hue}, 50%, 50%)`) 
            const bColor = this.colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`);                
            _addClick(bColor, c);
        });            

        [...Array(12)].forEach((_, idx) => {
            const hue =  Math.floor(idx * (360 / 12))
            const c = d3.rgb(`hsl(${hue}, 50%, 25%)`) 
            const bColor = this.colorGrid.append('div')
                .style('background-color', `rgb(${c.r}, ${c.g}, ${c.b} )`);                
            _addClick(bColor, c);
        });            

    }



}