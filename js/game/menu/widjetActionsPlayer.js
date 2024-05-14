
const configPlayerTeleport = [
    {label:"Home",          x:2000,     y:400},
    {label:"Beach Hill",    x:492,      y:-376},
    {label:"Cliff",         x:1028,     y:147},
    {label:"Top Montagne",  x:-1218,    y:1164},
    {label:"Hill Ice",  x:2819, y:-5689},
    {label:"Mix",  x:3902, y:-4584},

    {label:"0, 0",          x:0,        y:0},

    {label:"My - CV",          x:1036,        y:341},
]

import { WidjetActions } from "./widjetAction.js";

export class WidjetActionsPlayer extends WidjetActions {

    constructor(world, mainDiv) {
        super(world, mainDiv)

        this._createMainButt('playerAction', '🥷')

        this.mainOffset = {x: 0, y:0, z:0};
        this.currentImage = null;
        this.currentSize = 3;
        this.GS.set("WidjetActionsPlayer.currentSize", this.currentSize)

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
                this.world.player.lvlJump += 100;
                divx.text("💊 Speep-Boost - " + boostTime + "s -");

                [...Array(boostTime)].forEach((_, idx) => {
                    setTimeout(_ => {
                        divx.text("💊 Speep-Boost - " + (boostTime - idx) + "s -")
                    }, idx * 1000)
                })
            
                setTimeout(_ => {
                    this.world.player.speed -= 1;
                    this.world.player.lvlJump -= 100;
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
