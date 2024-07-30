

import { BoxInventory } from "./Box/boxInventory.js";
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

        this.inventoryBox = new BoxInventory(this.contentBox, world.player.inventory, _ => {
            this.GS.set("Player.inventory.update", 1) 
        })


    }

    drawUpdate() {
        this.inventoryBox.update()
        /*
        this.MDDiv.selectAll('div').remove();

        const player = this.world.player;
        let draggedElement = null;

        player.inventory.slots.forEach((value, idx) => {
            const boxIcon = this.MDDiv
                .append('div')
                .classed('inventoryIcon', true)
            const boxNode = boxIcon.node()

            boxNode.inventory = player.inventory;
            boxNode.slot = idx;

            if (value) {
                boxNode.draggable = true;
                boxIcon.html(`
                    <span class="icon"> 😎 </span> 
                    <span class="name"> ${value.itemId}</span>
                    <span class="count">${value.count}</span>
                `)
                
                boxNode.onDragFunc = target => {
                    if (boxNode.inventory == boxNode.inventory) {
                        boxNode.inventory.slotSwap(target.slot, draggedElement.slot)
                        console.log(target.slot, draggedElement.slot)
                    }
                }

                boxNode.addEventListener('dragstart', (e) => {
                    console.log('dragStart', e)
                    draggedElement = e.target;
                    setTimeout(() => e.target.classList.add('dragging'), 0);
                })
            } 
            boxNode.addEventListener('dragend', (e) => {
                console.log('dragEnd', e)
                e.target.classList.remove('dragging');
            });
            boxNode.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            boxNode.addEventListener('drop', (e) => {
                if (e.target.classList.contains('inventoryIcon')) {
                    console.log('DROP', e)
                    e.preventDefault();
                    if (draggedElement && draggedElement !== e.target) {
                        draggedElement.onDragFunc(e.target);
                      // const tempEmoji = e.target.textContent;
                      // e.target.textContent = draggedElement.textContent;
                      // draggedElement.textContent = tempEmoji;
                    }
        
                }
            });
    
        })
        */
            
        console.log('== Update_Inventory')

    }

}
