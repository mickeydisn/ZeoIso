import { META_Resource } from "../kmResource.js"
import { tooltipsFollow } from "./toolTips.js"



export class BoxInventory {

    constructor(mainDiv, inventory, onChange=_ => {}) {
        this.contentBox = mainDiv
        this._inventory = inventory
        this._onChange = onChange
        this.init()
        this.update()
        window.draggedElement = null;
    }

    // ---------------------
    //  Floor Action 
    // ---------------------
    init() {

        const tableBox = this
            .contentBox.append('div')
            .classed('row', true)
        this.MDDiv = tableBox.append('div').classed('inventoryMenu', true)

    }

    update() {
        this.MDDiv.selectAll('div').remove();


        console.log("inventory_slot", this._inventory.slots)
        this._inventory.slots.forEach((value, idx) => {
            const boxIcon = this.MDDiv
                .append('div')
                .classed('inventoryIcon', true)
            const boxNode = boxIcon.node()

            boxNode.inventory = this._inventory;
            boxNode.inventoryBox = this;
            boxNode.slot = idx;

            if (value) {
                boxNode.draggable = true;
                const icon = META_Resource[value.itemId] ? META_Resource[value.itemId].icon : '?'
                boxIcon.html(`
                    <span class="icon"> ${icon} </span> 
                    <span class="count">${value.count}</span>
                `)
                
                boxNode.onDragFunc = target => {
                    if (boxNode.inventory == target.inventory) {
                        boxNode.inventory.slotSwap(window.draggedElement.slot, target.slot)
                        this.update()
                        // this._onChange()
                    } else {
                        console.log('else')
                        boxNode.inventory.slotSwapInventory(window.draggedElement.slot, target.slot, target.inventory)
                        this.update()
                        target.inventoryBox.update()
                        // this._onChange()
                    }
                }

                boxNode.addEventListener('dragstart', (e) => {
                    d3.selectAll('#tooltips')
                        .classed('tooltipsVisible', false)

                    console.log('dragStart', e)
                    window.draggedElement = e.target;
                    setTimeout(() => e.target.classList.add('dragging'), 0);
                })
                // ToolTips
                tooltipsFollow(boxIcon, `
                    <table>
                        <tr><td>${value.itemId} ( ${value.count} )</td></tr>
                    </table>
                
                `)
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
                    console.log('DROP', draggedElement, e)
                    e.preventDefault();
                    if (draggedElement && e.target) {
                        window.draggedElement.onDragFunc(e.target);
                      // const tempEmoji = e.target.textContent;
                      // e.target.textContent = draggedElement.textContent;
                      // draggedElement.textContent = tempEmoji;
                    }
        
                }
            });
            

        })
            
        console.log('== Update_Inventory')

    }

}
