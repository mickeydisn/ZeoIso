import { META_Resource } from "../kmResource.js"
import { tooltipsFollow } from "./toolTips.js"



export class BoxProduction {

    constructor(mainDiv, production, onChange=_ => {}) {
        this.contentBox = mainDiv
        this._production = production
        this._onChange = onChange
        this.init()
        this.update()
        // window.draggedElement = null;
    }

    // ---------------------
    //  Floor Action 
    // ---------------------
    init() {
        const tableBox = this
            .contentBox.append('div')
            .classed('row', true)
        this.MDDiv = tableBox.append('div').classed('productionMenu', true)

    }

    update() {
        this.MDDiv.selectAll('div').remove();
        const boxHead = this.MDDiv
            .append('div')
            .classed('productioHead', true)
        boxHead.html(`
            <span class="empty"></span>
            <span class="buyMax">max ${this._production.buildings.map(x => x.count).reduce((acc, value) => acc + value, 0)} / ${this._production.buildingMax}</span>
        `)


        this._production.buildings.forEach((b, idx) => {
            const boxIcon = this.MDDiv
                .append('div')
                .classed('productionIcon', true)

            boxIcon.html(`
                <span class="icon"> 😆 </span> 
                <span class="name" id="name">${b.name}</span>
                <span class="count">${b.count}</span>
                <span class="buy countP" id="buy">Buy</span>
                <span class="buy countM">Sell</span>
            `)

            const costDisplay = cost => cost.map(c => `${c.itemId} : ${c.cost}`).join('<br>') 
            
            tooltipsFollow(boxIcon.selectAll('#name'), `
                <table>
                    <tr><td colspan=3>Default</td></tr>
                    <tr>
                        <td><div>${costDisplay(b.inputs)}</div></td>
                        <td class="arrow">➡︎</td>
                        <td><div>${costDisplay(b.outputs)}</div></td>
                    </tr>
                </table>
            `)
            tooltipsFollow(boxIcon.selectAll('#buy'), `
                <table>
                    <tr><td>Cost</td></tr>
                    <tr><td><div>${costDisplay(b.cost)}</div></td></tr>
                </table>
            
            `)

        })  
        console.log('== Update_Inventory')

    }

}
