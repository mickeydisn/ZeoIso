import { META_Resource } from "../kmResource.js"
import { tooltipsFollow } from "./toolTips.js"



export class BoxEntity {

    constructor(mainDiv, entities, onChange=_ => {}) {
        this.contentBox = mainDiv
        this._entities = entities
        // this.showAllBuild = false
        
        this._onChange = onChange
        this.init()
        this.update()
    }

    // ---------------------
    //  Floor Action 
    // ---------------------
    init() {
        const tableBox = this
            .contentBox.append('div')
            .classed('row', true)
        this.boxContent = tableBox.append('div').classed('entitiesMenu', true)

    }

    update() {
        this.boxContent.selectAll('div').remove();


        const boxHead = this.boxContent
            .append('div')
            .classed('entitiesHead', true)
        boxHead.html(`
            <span class="buyOne"><input type="checkbox" id="buyOne"></input> show all</span>
            <span class="buyMax">max ${this._entities.length} / ${0}</span>
        `)

        this._entities.forEach(entity => {
            const boxIcon = this.boxContent
                .append('div')
                .classed('entityIcon', true)

            boxIcon.html(`
                <span class="icon"> 😆 </span> 
                <span class="name" id="name">${entity.name}</span>
                <span class="goal">${entity.mainGoal}</span>
                <span class="link" id="buy">${
                    ''
                    + (entity.cityLink.grave ? ' 🪦 ' : ' _ ')
                    + (entity.cityLink.house ? ' 🏠 ' : ' _ ')
                    + (entity.cityLink.lab ? ' 🔬 ' : ' _ ')}
                </span>
            `)                

        });

        /*

        boxHead.selectAll('#showall')
            .property('checked', this.showAllBuild)
            .on('change', e => {
                this.showAllBuild = ! this.showAllBuild;
                this.update()
            })

        const listBuild = this.showAllBuild ?  this._production.buildingPossible() : this._production.buildings

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
    */

    }
    
}
