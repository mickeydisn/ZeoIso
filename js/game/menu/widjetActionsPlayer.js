
const configPlayerTeleport = [
    {label:"Home",          x:2000,     y:400},
    {label:"Beach Hill",    x:492,      y:-376},
    {label:"Cliff",         x:1028,     y:147},
    {label:"Top Montagne",  x:-1218,    y:1164},
    {label:"0, 0",          x:0,        y:0},

    {label:"My - CV",          x:1036,        y:341},
]

export class WidjetActionsPlayer {

    constructor(world, mainDiv) {
        this.world = world;
        this.GS = this.world.globalState;
        
        console.log('=== WidjetAssetList - Init')

        this.mainDiv = mainDiv
        this.mainOffset = {x: 0, y:0, z:0};
        this.currentImage = null;
        this.currentSize = 3;
        this.GS.set("WidjetActionsPlayer.currentSize", this.currentSize)
/*
<div class="buttMenuBox" id="KeyBoard">
        <input type="checkbox" id="checkbox_menuBox_KeyBoard" name="MenuBox">
        <label for="checkbox_menuBox_KeyBoard"></label>
</div>

*/

        // Create Switch Button 
        this.mainDiv.html( `

<div class="buttMenuBox  switch" id="playerAction">
        <input type="radio" id="checkbox_menuBox_playerAction" name="MenuBox">
        <label for="checkbox_menuBox_playerAction">🥷</label>
        <div class="widjetMenuBox slider" id="playerAction" >
            <div id="content" class="menuAction">  </div>
        </div>
</div>
        `)

        /* / Generate Content 
        {
            const changeInput = this.mainDiv.select('#checkbox_menuBox_KeyBoard')
            changeInput
                .on('change', e => {
                    console.log("checkbox_menuBox_KeyBoard", changeInput.property('checked'))
                    if (changeInput.property('checked')) {
                        this.GS.set('Setting.KeboardType', "qwzert")
                    } else {
                        this.GS.set('Setting.KeboardType', "azerty")
                    }

                })

        }
        */

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
                .text("= PLAYER ACTION =")
        }
        {
            this.contentBox.append('div').classed('row', true).classed('subtitel', true)
                .text("Boost:")

            const divx = this.contentBox.append('div')
                .classed('row', true)
                .classed('action', true)
                .text("💊 Speep-Boost" )

            const boostTime = 10
            divx.on('click', _ => {
                this.world.player.speed += 1;
                divx.text("💊 Speep-Boost - " + boostTime + "s -");

                [...Array(boostTime)].forEach((_, idx) => {
                    setTimeout(_ => {
                        divx.text("💊 Speep-Boost - " + (boostTime - idx) + "s -")
                    }, idx * 1000)
                })
            
                setTimeout(_ => {
                    this.world.player.speed -= 1;
                    divx.text("💊 Speep-Boost ");
                }, boostTime * 1000)
            
            })
        }
        {

            this.contentBox.append('div').classed('row', true).classed('subtitel', true)
                .text("Teleportation:")

            configPlayerTeleport.forEach(conf => {
                const divx = this.contentBox.append('div')
                    .classed('row', true)
                    .classed('action', true)
                    .text("🌀 " + conf.label)
                divx.on('click', _ => {
                        this.world.player.setCenter(conf.x, conf.y)
                    })
            })
    
        }


    }

}
