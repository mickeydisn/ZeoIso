

import { WidjetActions } from "./widjetAction.js";

export class WidjetActionsPlayerAct extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)

        this._createMainButt('playerActionAct', '🎒')

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
        /* {
            this.contentBox.append('div').classed('row', true).classed('title', true)
                .text("= Inventory =")
        } */

        const tableBox = this.contentBox.append('div')
            .classed('row', true)
        this.MDDiv = tableBox.append('div').classed('inventoryMenu', true)


    }

    drawUpdate() {
        const player = this.world.player
        const inventoryMD = ''
            + player.inventorySlot.map(([slot, value]) => {
                if (value) {
                    return `
                    <div class='inventoryIcon'>
                        <span class="icon"> 😎 </span> 
                        <span class="name"> ${value.itemId}</span>
                        <span class="count">${value.count}</span>
                    </div>` 
                } else {
                    return `
                    <div class='inventoryIcon'>
                    </div>` 
                }
            }).join('\n')
            
        console.log('== Update_Inventory')

        this.MDDiv.html(inventoryMD)

    }

}
