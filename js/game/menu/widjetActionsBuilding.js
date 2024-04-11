import { ButtTileAction } from "./widjetBtt.js";
import { WidjetActions } from "./widjetAction.js";

export class WidjetActionsBuilding extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)

        this._createMainButt('buildingAction', '🏢')


        this.mainOffset = {x: 0, y:0, z:0};
        this.currentImage = null;
        this.currentSize = 3;
        this.GS.set("WidjetActions.currentSize", this.currentSize)

        // Generate Content 
        {
            this.contentBox = this.mainDiv.select('#content')
            this.drawbuildingActionList();

        }

        { // First action . 
            const changeInput = this.mainDiv.select('#checkbox_menuBox_buildingAction')
            changeInput.on('change', e => {
                if (changeInput.property('checked') && this.firstAction) {
                    this.firstAction.click()
                }
            })
        }

        // Sub to Global state. 
       
    }



    // ---------------------
    //  Floor Action 
    // ---------------------
    drawbuildingActionList() {
        this.contentBox.selectAll('div').remove()

        // --------------------------------
        this.contentBox.append('div').classed('row', true).classed('titel', true)
            .text("= BUILDING ACTION =")


        /*/ --------------------------------
        {
            this.contentBox.append('div').classed('row', true).classed('subtitel', true)
                .text("Effect size:")

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
        } /* */

        // --------------------------------

        this.contentBox.append('div').classed('row', true).classed('subtitel', true)
            .text("Clear Actions")
        this.firstAction = new ButtTileAction(this.GS, this.contentBox, "Clear Item", {func:"clearItemSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Clear Color", {func:"clearColorSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Clear Lvl", {func:"clearLvlSquare", size:1})
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        // --------------------------------
        this.contentBox.append('div').classed('row', true).classed('subtitel', true)
            .text("Lvl Actions")
        new ButtTileAction(this.GS, this.contentBox, "Up", {func:"lvlUpSquare", size:1, lvl:1})
        new ButtTileAction(this.GS, this.contentBox, "Down", {func:"lvlUpSquare", size:1, lvl:-1})
        this.contentBox.append('div').classed('cell', true).classed('empty', true)
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        new ButtTileAction(this.GS, this.contentBox, "Smoth", {func:"lvlAvgSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Flat", {func:"lvlFlatSquare", size:1})
        new ButtTileAction(this.GS, this.contentBox, "Smoth\nBorder", {func:"lvlAvgBorder", size:1})
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        // --------------------------------
    }

}

