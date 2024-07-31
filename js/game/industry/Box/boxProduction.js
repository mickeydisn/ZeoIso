import { META_Resource } from "../kmResource.js"
import { tooltipsFollow } from "./toolTips.js"



export class BoxProduction {

    constructor(mainDiv, production, onChange=_ => {}) {
        this.contentBox = mainDiv
        this._production = production
        this.showAllBuild = false
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
            <span class="showall"><input type="checkbox" id="showall"></input> show all</span>
            <span class="buyMax">max ${this._production.buildingCount} / ${this._production.buildingMax}</span>
        `)

        boxHead.selectAll('#showall')
            .property('checked', this.showAllBuild)
            .on('change', e => {
                this.showAllBuild = ! this.showAllBuild;
                this.update()
            })

        const listBuild = this.showAllBuild ?  this._production.buildingPossible() : this._production.buildings
        console.log(listBuild)

        listBuild.forEach((b, idx) => {
            const boxIcon = this.MDDiv
                .append('div')
                .classed('productionIcon', true)

            boxIcon.html(`
                <span class="icon"> 😆 </span> 
                <span class="name" id="name">${b.name}</span>
                <span class="count">${b.count}</span>
                <span class="buy countP" id="buy">Buy</span>
                <span class="buy countM" id="sell">Sell</span>
            `)

            boxIcon.selectAll('#buy').on('click', _ => {
                this._production.buyBuilding(b.bId)
                this.update()
                this._onChange()
            })
            boxIcon.selectAll('#sell').on('click', _ => {
                this._production.sellBuilding(b.bId)
                this.update()
                this._onChange()
            })

            const costDisplay = cost => cost.map(c => `${c.itemId} : ${c.count}`).join('<br>') 
            
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
