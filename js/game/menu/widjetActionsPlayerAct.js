

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
        this.GS.sub("Player.inventory.update", "WidjetActionsTileInfo", this.drawUpdate.bind(this)) 

        this.drawUpdate()

    }



    // ---------------------
    //  Floor Action 
    // ---------------------
    drawplayerActionList() {
        this.contentBox.selectAll('div').remove()

        // --------------------------------
        {
            this.contentBox.append('div').classed('row', true).classed('title', true)
                .text("= Inventory =")
                
        }
        const tableBox = this.contentBox.append('div')
            .classed('row', true)
        this.MDDiv = tableBox.append('div')
            .classed('Markdown', true)
            .style('width', '100%')
            .style('padding', '0')
            .style('margin', '0')

    }

    drawUpdate() {
        const player = this.world.player
        const inventoryMD = ''
            + '| **Item** | **Qty** |\n'
            + '|:-:|:-:|\n'
            + player.inventory.map(slot => `| ${slot.itemId} | ${slot.count} |`).join('\n')
            + '\n\n\n'
            
        console.log('== Update_Inventory')

        this.MDDiv.html(window.marked.parse(inventoryMD))

    }

}
