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

        // --------------------------------

        this.contentBox.append('div').classed('row', true).classed('subtitel', true)
            .text("Building Base")
        this.firstAction = new ButtTileAction( this.GS, this.contentBox,
            "Base_10", {
                func:"buildingBase", buildType:'base', growLoopCount:10
        })
        this.firstAction = new ButtTileAction( this.GS, this.contentBox,
            "Base_40", {
                func:"buildingBase", buildType:'base', growLoopCount:40
        })
        this.firstAction = new ButtTileAction( this.GS, this.contentBox,
            "Base_100", {
                func:"buildingBase", buildType:'base', growLoopCount:100
        })
        // this.contentBox.append('div').classed('cell', true).classed('empty', true)
        // this.contentBox.append('div').classed('cell', true).classed('empty', true)
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        // --------------------------------
   
        this.contentBox.append('div').classed('row', true).classed('subtitel', true)
            .text("Building Place")
        this.firstAction = new ButtTileAction( this.GS, this.contentBox,
            "Place_10", {
                func:"buildingBase", buildType:'place', growLoopCount:10
        })
        this.firstAction = new ButtTileAction( this.GS, this.contentBox,
            "Place_40", {
                func:"buildingBase", buildType:'place', growLoopCount:40
        })
        this.firstAction = new ButtTileAction( this.GS, this.contentBox,
            "Place_100", {
                func:"buildingBase", buildType:'place', growLoopCount:100
        })
        // this.contentBox.append('div').classed('cell', true).classed('empty', true)
        // this.contentBox.append('div').classed('cell', true).classed('empty', true)
        this.contentBox.append('div').classed('cell', true).classed('empty', true)

        // --------------------------------
    }

}

