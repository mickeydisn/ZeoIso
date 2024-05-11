

import { WidjetActions } from "./widjetAction.js";

export class WidjetActionsPlayerAct extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)

        this._createMainButt('playerActionAct', '⛏')

        this.mainOffset = {x: 0, y:0, z:0};
        this.currentImage = null;
        this.currentSize = 3;

        // Generate Content 
        {
            this.contentBox = this.mainDiv.select('#content')
            this.drawplayerActionList();

        }
        // Sub to Global state. 
       
    }



    // ---------------------
    //  Floor Action 
    // ---------------------
    drawplayerActionList() {
        this.contentBox.selectAll('div').remove()

        // --------------------------------
        {
            this.contentBox.append('div').classed('row', true).classed('titel', true)
                .text("= Action =")
        }
 


    }

}
