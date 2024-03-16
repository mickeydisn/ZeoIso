/* 
key : 'name of asset in loader '
near : open position in near tile[ NW, NE , SE , SW ]
*/

import { BuildTile } from "./buildTile.js";
import * as Utils from "./utils.js";


import {axeNextTileOfList} from "./utils.js"

import { BuildConf_Base } from "./buildConf_base.js"
import { BuildConf_Place } from "./buildConf_place.js";
import { BuildConf_Place2 } from "./buildConf_place2.js";

// ====================================================
// ====================================================
// ====================================================


export class FactoryBuilding {
    constructor(world) {
        this.world = world;
        this.ta = world.tilesActions;

        // this.conf = new BuildConf_Base()
        // this.conf = new BuildConf_Place()
        this.conf = new BuildConf_Place2()
    }

    //----------- 

    nextTile (bTileOpen, tileList ) {
        // Select a Tile to build 
        let bTile = bTileOpen.shift()
        if (!bTile) return bTileOpen;

        // Build the tile 
        bTile.filterChoiseNearTile(tileList);

        // Add Nead teal to the openTileList 
        const bTileNext = bTile.getNearVoid()
        bTileNext.forEach(e => bTileOpen.push(e) )

        return bTileOpen
    }
 



    start(x, y) {
        console.log('============== Start Building ---- ')

        

        let bTile = new BuildTile(this.world, this, x, y)
        bTile.applyBuild(this.conf.BUILD_TILE_START);
        // bTile.mustBeFill = ["B2"]

        let bTileOpen = bTile.getNearVoid();
        // console.log('bTileOpen', bTileOpen.map(x => x));

        
        [...Array(this.conf.growLoopCount).keys()].forEach(i => {

            console.log('======== BuildOneTile', i)

            bTileOpen = bTileOpen.filter(bTile => 
                bTile && 
                Utils.intersect(this.conf.growTileTag, bTile.mustBeFill.flat()).length > 0 &&
                bTile.conf == null
            )

            bTileOpen = this.nextTile(
                bTileOpen, 
                this.conf.BUILD_TILE_LIST
            )

            if(this.conf.buildEmpty) {
                let emptyTile = bTileOpen.filter(bTile => 
                    Utils.intersect(this.conf.growTileTag, bTile.mustBeFill.flat()).length == 0 &&
                    Utils.intersect(this.conf.emptyTileTag, bTile.mustBeFill.flat()).length > 0 
                )
                if (emptyTile.length > 0) console.log('======== Empty', emptyTile)
                emptyTile.forEach(bTile => {
                    bTile.filterChoiseNearTile(this.conf.BUILD_TILE_LIST_EMPTY);
                })
            }                
            //console.log('bTileOpen', bTileOpen.map(x => x));

        }) ;    
        
        
        [...Array(this.conf.endLoopMax).keys()].every(i => {
            if ( bTileOpen.length == 0) {
                return false
            }

            console.log('======== EndLoo', i)

            bTileOpen = bTileOpen.filter(bTile => 
                bTile && 
                Utils.intersect(this.conf.growTileTag, bTile.mustBeFill.flat()).length > 0 &&
                bTile.conf == null
            )

            bTileOpen = this.nextTile(
                bTileOpen, 
                this.conf.BUILD_TILE_LIST_CLOSE
            )
            return true
        }) ;    
        /*
        let i = 0;
        while( bTileOpen.length > 0 && i < this.conf.endLoopMax) {
            i += 1;
            console.log('======== BuildCLOSE', )

            bTileOpen = bTileOpen.filter(bTile => bTile && 
                bTile.mustBeFill != null &&
                Utils.intersect(this.conf.growTileTag, bTile.mustBeFill).length > 0 &&
                bTile.conf == null
            )
            
            bTileOpen = this.nextTile(
                bTileOpen, 
                this.conf.BUILD_TILE_LIST_CLOSE
            )
        } 
        */

        console.log('--- End Building ---- ')
    }
    //----------- 

}

