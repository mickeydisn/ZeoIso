import { ButtTileAction } from "./widjetBtt.js";
import { WidjetActions } from "./widjetAction.js";

export class WidjetActionsBuilding extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)

        this._createMainButt('buildingAction', '🏢')


        this.mainOffset = {x: 0, y:0, z:0};
        this.currentImage = null;
        this.growSize = 10;
        this.GS.set("WidjetActions.growSize", this.growSize)

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
        this.contentBox.append('div').classed('row', true).classed('title', true)
            .text("= BUILDING ACTION =")

        // --------------------------------
        // --------------------------------
        this.contentBox.append('div').classed('row', true).classed('subtitle', true)
            .text("Grow size:")

        const sizeInput = this.contentBox.append('div').classed('row', true).classed('input', true)
            .html(`
        <div class="clickBox" id="remove">-</div>
        <div class="centerBox" id="label">${this.growSize}</div>
        <div class="clickBox" id="add">+</div>
        `)

        sizeInput.select('#remove').on('click', _ => {
            this.growSize = this.growSize > 10 ? this.growSize - 10 : this.growSize;
            sizeInput.select('#label').text(this.growSize);
            this.GS.set("WidjetActions.growSize", this.growSize)
            this.GS.get("WidjetActions.currentButt").click()
        })
        sizeInput.select('#add').on('click', _ => {
            this.growSize = this.growSize + 10;
            sizeInput.select('#label').text(this.growSize);
            this.GS.set("WidjetActions.growSize", this.growSize)
            this.GS.get("WidjetActions.currentButt").click()
        })
        /*
        // --------------------------------
        {
            this.contentBox
                .append('div').classed('row', true).classed('subtitle', true)
                .text("Building Place / Base ")
            this.firstAction = new ButtTileAction(
                this.GS, this.contentBox,
                "Place", {
                    func:"wcBuild", buildType:'place3', growLoopCount:10
                })

            this.firstAction = new ButtTileAction(
                this.GS, this.contentBox,
                "Base", {
                    func:"wcBuild", buildType:'base3', growLoopCount:10
                })

            this.firstAction = new ButtTileAction(
                this.GS, this.contentBox,
                "BaseBorder", {
                    func:"wcBuild", buildType:'baseBorder3', growLoopCount:10
                })
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            this.contentBox.append('div').classed('cell', true).classed('empty', true)
       }    
       */

        // --------------------------------


        // --------------------------------
        {
            this.contentBox
                .append('div').classed('row', true).classed('subtitle', true)
                .text("Building House")
            this.firstAction = new ButtTileAction(
                this.GS, this.contentBox,
                "House_3", {
                    func:"wcBuild", buildType:'house3', growLoopCount:10
                })
            this.firstAction = new ButtTileAction(
                this.GS, this.contentBox,
                "House_3a", {
                    func:"wcBuild", buildType:'house3a', growLoopCount:10
                })                
            this.firstAction = new ButtTileAction(
                this.GS, this.contentBox,
                "House_3b", {
                    func:"wcBuild", buildType:'house3b', growLoopCount:10
                })                
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            this.contentBox.append('div').classed('cell', true).classed('empty', true)
        }

        // --------------------------------
        {
            this.contentBox
                .append('div').classed('row', true).classed('subtitle', true)
                .text("Building Mini Base")           
            this.firstAction = new ButtTileAction( 
                this.GS, this.contentBox,
                "House_4a", {
                    func:"wcBuild", buildType:'house4a', growLoopCount:10
                })
            this.firstAction = new ButtTileAction( 
                this.GS, this.contentBox,
                "House_4b", {
                    func:"wcBuild", buildType:'house4b', growLoopCount:10
                })
            this.firstAction = new ButtTileAction( 
                this.GS, this.contentBox,
                "House_4D", {
                    func:"wcBuild", buildType:'house4D', growLoopCount:10
                })
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
        }

        // --------------------------------
        {
            this.contentBox
                .append('div').classed('row', true).classed('subtitle', true)
                .text("Building Big Base")
            this.firstAction = new ButtTileAction( 
                this.GS, this.contentBox,
                "House_5", {
                    func:"wcBuild", buildType:'house5', growLoopCount:10
                })
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            this.contentBox.append('div').classed('cell', true).classed('empty', true)
        }
        
        
        // --------------------------------
        {
            this.contentBox
                .append('div').classed('row', true).classed('subtitle', true)
                .text("Building Cimetier")
            this.firstAction = new ButtTileAction( 
                this.GS, this.contentBox,
                "House_6a", {
                    func:"wcBuild", buildType:'house6a', growLoopCount:10
                })
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            // this.contentBox.append('div').classed('cell', true).classed('empty', true)
            this.contentBox.append('div').classed('cell', true).classed('empty', true)
        }
            
            


        // --------------------------------
    }

}

