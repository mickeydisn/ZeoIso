
const configPlayerTeleport = [
    {label:"Center",        x:2000,     y:400},
    {label:"Beach Hill",    x:492,      y:-376},
    {label:"Cliff",         x:1028,     y:147},
    {label:"Top Montagne",  x:-1218,    y:1164},
    {label:"0, 0",          x:0,        y:0},

    {label:"Flat",          x:1036,        y:341},
]

export class WidjetActionsUtils {

    constructor(world, mainDiv) {
        this.world = world;
        this.GS = this.world.globalState;
        
        console.log('=== WidjetAssetList - Init')

        this.mainDiv = mainDiv
        this.mainOffset = {x: 0, y:0, z:0};
        this.currentImage = null;
        this.currentSize = 3;
        this.GS.set("WidjetActionsUtils.currentSize", this.currentSize)


        // Create Switch Button 
        this.mainDiv.html( `

<div class="buttMenuBox" id="KeyBoard">
        <input type="checkbox" id="checkbox_menuBox_KeyBoard" name="MenuBox">
        <label for="checkbox_menuBox_KeyBoard"></label>
</div>


<div class="buttMenuBox  switch" id="utilsAction">
        <input type="radio" id="checkbox_menuBox_utilsAction" name="MenuBox">
        <label for="checkbox_menuBox_utilsAction">🥷</label>
        <div class="widjetMenuBox slider" id="utilsAction" >
            <div id="content" class="menuAction">  </div>
        </div>
</div>
        `)

        // Generate Content 
        {
            const changeInput = this.mainDiv.select('#checkbox_menuBox_KeyBoard')
            changeInput
                .on('change', e => {
                    console.log("checkbox_menuBox_KeyBoard", changeInput.property('checked'))
                    if (changeInput.property('checked')) {
                        this.GS.set('KeboardType', "qwzert")
                    } else {
                        this.GS.set('KeboardType', "azerty")
                    }

                })

        }


        // Generate Content 
        {
            this.contentBox = this.mainDiv.select('#content')
            this.drawutilsActionList();

        }
        // Sub to Global state. 
       
    }



    // ---------------------
    //  Floor Action 
    // ---------------------
    drawutilsActionList() {
        this.contentBox.selectAll('div').remove()

        // --------------------------------

        this.contentBox.append('div').classed('row', true).text("Teleportation")

        configPlayerTeleport.forEach(conf => {
            const divx = this.contentBox.append('div')
                .classed('row', true)
                .classed('action', true)
                .text("🌀 " + conf.label)
            divx.on('click', _ => {
                    this.world.player.setCenter(conf.x, conf.y)
                })

        })

        /*
            const BPlace = new ButtUtilsAction(this.GS, this.contentBox, "Place", {func:"itemForceKey"})
            new ButtUtilsAction(this.GS, this.contentBox, "Add", {func:"itemForceKey"})
            this.contentBox.append('div').classed('cell', true)
        */
        /*
        this.contentBox.append('div')
            .classed('cell', true)
            .classed('assetList', true)
            .text('Asset List⇩')
            .on('click', _ => {
                const openList = this.GS.get('WidjetAssetList.isVisibel')
                this.GS.set('WidjetAssetList.isVisibel', !openList)
                this.GS.set("WidjetActionsUtils.currentButt", BPlace)

            })
        */

    }

}



class ButtUtilsAction {
    constructor(GS, parentDiv, key, funcConf) {
        this.GS = GS;
        this.key = key;
        this._funcConf = funcConf;

        this.parentDiv = parentDiv;

        this.initDiv();

        this.GS.sub("WidjetActionsUtils.currentButt", "ButtTileActionUtils_" + key, 
            this.updateCurrentAction.bind(this))
    }
    
    get funcConf () { return  this._funcConf }

    updateCurrentAction(buttObj) {
       
        if (this !== buttObj) {
            this.mainDiv.style('border-color', "#AEAEAE")
        } else {
            this.mainDiv.style('border-color', "#363636")
        }
    }

    initDiv() {
        this.mainDiv = this.parentDiv.append('div')
            .classed('cell', true)
            .on('click', _ => this.click())
        this.mainDiv.style('border-color', "#AEAEAE")

        this.mainDiv.append('div')
            .classed('label', true)
            .text(this.key);
    }

    click() {
        this.GS.set("WidjetActionsUtils.currentButt", this)
    }
}
