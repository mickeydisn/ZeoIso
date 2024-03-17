import * as Utils from "./utils.js";
import {AXE_DIRECTION} from "./utils.js";

import { TILE_GEN_ZOOM } from "../map/tile.js";


export class BuildTile {
    constructor(world, building, x, y) {
        this.world = world;
        this.fm = world.factoryMap;
        this.fg = world.factoryGenerator;
        this.ta = this.world.tilesActions

        this.building = building;
        this.x = x;
        this.y = y;

        
        this.conf = null;
        this.mustBeFill = [null, null, null, null];

        this.tile = this.fm.getTile(this.x, this.y)
        this.ta.lvlSet(this.x, this.y, building.lvl)
        
        this.tile.buildTile = this;

        // this.ta.colorSquare(x, y, 1, [0, 0, 0, 255])
        this.ta.lvlFlatSquare(this.x, this.y, 3)
        this.ta.lvlAvgSquare(this.x, this.y, 5)
        this.ta.lvlAvgSquare(this.x, this.y, 7)

    }

    // -----------------------

    buildMarkNearTile() {
        return [0, 1, 2, 3].map(axe => {
            const [dx, dy] = AXE_DIRECTION[axe]
            
            const tile = this.fm.getTile(this.x + dx, this.y + dy);
            if (tile.building == null) {
                const newBuild  = new BuildTile(this.world, this.building, this.x + dx, this.y + dy)
                tile.building = newBuild
            }
            const nearB = tile.building
            if (this.conf == null) return nearB;
            const axeFromTarget = (axe + 2) % 4

            if (nearB.mustBeFill[axeFromTarget] == null ) {
                nearB.mustBeFill[axeFromTarget] = this.conf.near[axe].con.filter(x => x != null)
            }
            return nearB
        })
    }

   // -----------

    _applyBuildItem(conf) {
        const c = conf.color ? conf.color : [0, 0, 0, 255]
        this.ta.colorSquare(this.x, this.y, 1, c)
        this.ta.itemForceKey(this.x, this.y, conf.key)

        this.tLinked = this.buildMarkNearTile();
        // console.log("--Build TILE=", this.x, this.y, this.conf.near, this.tLinked);
        
    }

    _applyEmpy(conf) {
        const c = conf.color ? conf.color : [0, 0, 0, 255]
        this.ta.colorSquare(this.x, this.y, 1, c)
        this.tLinked = this.buildMarkNearTile();

        // this.ta.lvlAvgSquare(this.x, this.y, 5)
        // this.ta.lvlAvgSquare(this.x, this.y, 7)

        // this.ta.itemForceKey(this.x, this.y, conf.key)
        // console.log("--Build TILE= EMPTY ", this.x, this.y, this.conf.near, this.tLinked);
    }

    applyBuild(conf) {
        this.conf = conf
        this.mustBeFill = conf.near.map(x => x.is)

        if (conf.t && conf.t == 'empty') {
            this._applyEmpy(conf)
        }
        if (conf.key) {
            this._applyBuildItem(conf)
        }
    }

    // --------------

    getNearTiles() {
        // For Each Axe
        return [0, 1, 2, 3].map(axe => {
            const [dx, dy] = AXE_DIRECTION[axe]
            return  this.fm.getTile(this.x + dx, this.y + dy);
        })
    }

    getNearVoid() {
        return this.getNearTiles()
            .map(t => t.building)
            .filter(b =>  b != null && b.conf == null )
    }


    /*
    ------------------------------------------
    */

    nearTile(dx, dy) {
        return this.fm.getTile(this.x + dx, this.y + dy);
    }
    nearBuilding(dx, dy) {
        const tile = this.nearTile(dx, dy)
        if (tile.building == null) {
            tile.building = new BuildTile(this.world, this.building, this.x + dx, this.y + dy)
        }
        return tile.building
    }

    nearAxeTile(axe) {
        const [dx, dy] = AXE_DIRECTION[axe]
        return this.nearTile(dx, dy)
    }
    getAxeTilesBuilding(axe) {
        const [dx, dy] = AXE_DIRECTION[axe]
        return this.nearBuilding(dx, dy)
    }

    // ------------------------------
    // ------------------------------

    filterAxeTilesOption(tilesOptions, axe) {
        tilesOptions = tilesOptions.filter(tileConf => {
            // console.log(tileConf.key , axe, this.mustBeFill[axe], tileConf.near[axe].is)
            return Utils.intersect(this.mustBeFill[axe], tileConf.near[axe].is).length > 0
        })
        return tilesOptions
    }

    filterNearTilesOption(_tilesOptions) {
        let tilesOptions = _tilesOptions.map(x => x);
        [0, 1, 2, 3].map(axe => {
            if (this.mustBeFill[axe] != null) {
                tilesOptions = this.filterAxeTilesOption(tilesOptions, axe);
            } 
        })
        return tilesOptions;
    }

    filterNearTilesOptionAdvance(listTilesOption) {
        // copy the list 
        let tilesOptions = listTilesOption.map(x => x);


        // ---------
        // For Each Axe we want to filter the list . 
        [0, 1, 2, 3].map(axe => {

            // If an axe is allready tag => Filter the possibleList by on this axe            
            if (this.mustBeFill[axe] != null) {
                // console.log('===== Filter Axe ', axe, "NOT NULL", this.mustBeFill[axe])
                tilesOptions = this.filterAxeTilesOption(tilesOptions, axe);
            } else {
                // console.log('===== Filter Axe ', axe, "NULL")

                // Get the Target Tile
                const targetTagetTileBuilding = this.getAxeTilesBuilding(axe);
                let targetTilesOptions = listTilesOption.map(x => x);
                targetTilesOptions = targetTagetTileBuilding.filterNearTilesOption(targetTilesOptions)

                // console.log('=targetTilesOptions  ', targetTagetTileBuilding.mustBeFill, [...targetTilesOptions])

                if (targetTagetTileBuilding.mustBeFill.filter(x => x != null).length > 0) {
                    // Get the target axe point to this. 
                    const axeFromTarget = (axe + 2) % 4
                    const setTargetOptionTile = [...new Set(targetTilesOptions.map(to => to.near[axeFromTarget].is))]

                    // console.log("setTargetOptionTile", setTargetOptionTile)
                    tilesOptions = tilesOptions.filter(to => {
                        const filter = Utils.intersect(to.near[axe].con , setTargetOptionTile).length > 0
                        // console.log(filter, to.key, to.near[axe].con)
                        return filter
                    });

                    // console.log("targetTilesOptions", setTargetOptionTile, targetTilesOptions)

                }

            }
            // console.log(">filterNearTiles", [...tilesOptions])


            
        })

        if (tilesOptions.length == 0) {
            console.log("EMPTY")
            // this.tile.getLog()
        }


        return tilesOptions;
    }
    /// ---------

    filterChoiseNearTile(buildTileList) {

        const tilesOptions = this.filterNearTilesOptionAdvance(buildTileList)
     
        const mrand = this.fg.getRandBuilding(this.x, this.y, 17, TILE_GEN_ZOOM)
        // const mrand =  Math.random()
        const pickedItemConf = pickRandomWeightedObject(tilesOptions, mrand)
        if (pickedItemConf) {
            this.applyBuild(pickedItemConf)
        } else {
            const till = this.buildMarkNearTile();
            console.log('ERROR NOT FOUND ',  this.x, this.y ,  this, this.mustBeFill);
            this.ta.colorSquare(this.x, this.y, 1, [255, 0, 0])

        }

    }

}



function pickRandomWeightedObject(array, rand=null) {
    const mrand = rand ? rand : Math.random()
    // Calculate the total weight of all objects in the array
    const totalWeight = array.reduce((acc, obj) => acc + obj.Tw, 0);

    // Generate a random number between 0 and the total weight
    const randomWeight = mrand * totalWeight;

    // Iterate through the objects and accumulate their Tws until
    // the accumulated weight exceeds the randomWeight
    let accumulatedWeight = 0;
    for (const obj of array) {
        accumulatedWeight += obj.Tw;
        if (accumulatedWeight >= randomWeight) {
            // Return the object when the accumulated weight exceeds the random weight
            return obj;
        }
    }

    // This should not happen, but if it does, return null or handle the case appropriately
    return null;
}