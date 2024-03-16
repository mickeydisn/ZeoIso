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
        this.mustBeFill = null;

        this.tile = this.fm.getTile(this.x, this.y)
        this.tile.buildTile = this;

        this.updateColor()
    }

    updateColor() {
        const c = 
            // this.conf == null ? [64, 64, 64, 255] : 
            // this.conf == null ?  [32, 32, 32, 255] :
            this.mustBeFill == null ?  [64, 64, 64, 255] :
            this.mustBeFill[0] == 1 ?  [0, 0, 0, 255] :
            this.mustBeFill[0] == 0 ?  [0, 64, 64, 255] :
            this.mustBeFill[0] == -1 ?  [0, 64, 0, 255] :
            [128, 128, 128, 255]

        this.ta.colorSquare(this.x, this.y, 1, c)
        this.ta.flateSquareLvl(this.x, this.y, 3)
        
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

            if (nearB.mustBeFill == null || nearB.mustBeFill.includes(null)) {
                nearB.mustBeFill = this.conf.near[axe] ? this.conf.near[axe].filter(x => x != null) : null
            }
            nearB.updateColor()
            return nearB
        })
    }


    // -----------



    _applyBuildItem(conf) {
        this.conf = conf
        this.ta.colorSquare(this.x, this.y, 1, [0, 0, 0, 255])
        this.ta.flateSquareLvl(this.x, this.y, 3)
        this.ta.itemForceKey(this.x, this.y, conf.key)
        this.tLinked = this.buildMarkNearTile();
        // console.log("--Build TILE=", this.x, this.y, this.conf.near, this.tLinked);
        
    }

    _applyEmpy(conf) {
        this.conf = conf
        this.ta.colorSquare(this.x, this.y, 1, [0, 64, 64, 255])
        this.ta.flateSquareLvl(this.x, this.y, 3)
        // this.ta.itemForceKey(this.x, this.y, conf.key)
        this.tLinked = this.buildMarkNearTile();
        // console.log("--Build TILE= EMPTY ", this.x, this.y, this.conf.near, this.tLinked);
    }

    applyBuild(conf) {
        this.mustBeFill = Utils.isArray(conf.Tm) ?  conf.Tm : [conf.Tm]
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
    getNearBuildMustBeFill() {
        return this.getNearTiles().map(t => !t.building ? null : t.building.mustBeFill)
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

    filterNearTiles(buildTileList) {
        // copy the list 
        let filterList = buildTileList.map(x => x);

        /*
        // ---------
        // Filter if intersection ( this.musBeFill 
        filterList = filterList.filter(e => {
            return Utils.intersect(this.mustBeFill, e.Tm).length > 0
        });
        */

        console.log(">>Start>filterNearTiles", [...filterList]);

        // ---------
        // For Each Axe we want to filter the list . 
        [0, 1, 2, 3].map(axe => {

            // Get the building following the Axe 
            const targetBuilding = this.getAxeTilesBuilding(axe);

            /*
            // ---------
            // If the target have a muse be. 
            if (targetBuilding.mustBeFill != null) {
                // Filter the list                 
                filterList = filterList.filter(tileConf => {
                    // if no validation on this axe. 
                    if (tileConf.near[axe] == null ) return true;
                    
                    // Or if the axe configuration match the target 
                    if (Utils.intersect(tileConf.near[axe], targetBuilding.mustBeFill).length > 0 ) return true;

                    return false;
                })
            }
            */

            // ---------
            // Get the target axe point to this. 
            const axeFromTarget = (axe + 2) % 4

            // If the target have a muse be. 
            if (targetBuilding.conf != null && 
                targetBuilding.conf.near != null && 
                // if have validation the axe point the curent tile. 
                targetBuilding.conf.near[axeFromTarget] != null 
            ) {
                // Filter the list                 
                filterList = filterList.filter(tileConf => {
                    console.log("Filter", axe, targetBuilding.conf.near[axeFromTarget], tileConf.near[axe], Utils.intersect(targetBuilding.conf.near[axeFromTarget], tileConf.near[axe]).length)
                    // The mask of the tile config must match the configuration of the Target config
                    if (Utils.intersect(targetBuilding.conf.near[axeFromTarget], tileConf.near[axe]).length > 0) return true;

                    return false;
                })
            }          

            console.log(">>filterNearTiles", [...filterList]);

            /*
            // ---------
            // Is the Building have never be config
            if (targetBuilding.mustBeFill == null) {
                filterList = filterList.filter(tileConf => {
                    return tileConf.near[axe] == null || tileConf.near[axe].includes(null)
                })
            }  
            */
              
        })

        if (filterList.length == 0) {
            // this.tile.getLog()
        }
        console.log(">filterNearTiles", [...filterList])


        return filterList;
    }
    /// ---------

    filterNearTiles_Save(buildTileList) {
        // copy the list 
        let filterList = buildTileList.map(x => x);

        // ---------
        // Filter if intersection ( this.musBeFill 
        filterList = filterList.filter(e => {
            return Utils.intersect(this.mustBeFill, e.Tm).length > 0
        });

        console.log(">>Start>filterNearTiles", [...filterList]);

        // ---------
        // For Each Axe we want to filter the list . 
        [0, 1, 2, 3].map(axe => {

            // Get the building following the Axe 
            const targetBuilding = this.getAxeTilesBuilding(axe);

            // ---------
            // If the target have a muse be. 
            if (targetBuilding.mustBeFill != null) {
                // Filter the list                 
                filterList = filterList.filter(tileConf => {
                    // if no validation on this axe. 
                    if (tileConf.near[axe] == null ) return true;
                    
                    // Or if the axe configuration match the target 
                    if (Utils.intersect(tileConf.near[axe], targetBuilding.mustBeFill).length > 0 ) return true;

                    return false;
                })
            }

            // ---------
            // Get the target axe point to this. 
            const axeFromTarget = (axe + 2) % 4

            // If the target have a muse be. 
            if (targetBuilding.conf != null && 
                targetBuilding.conf.near != null && 
                // if have validation the axe point the curent tile. 
                targetBuilding.conf.near[axeFromTarget] != null 
            ) {
                // Filter the list                 
                filterList = filterList.filter(tileConf => {
                    // The mask of the tile config must match the configuration of the Target config
                    if (Utils.intersect(targetBuilding.conf.near[axeFromTarget], tileConf.Tm).length > 0) return true;

                    return false;
                })
            }          

            // ---------
            // Is the Building have never be config
            if (targetBuilding.mustBeFill == null) {
                filterList = filterList.filter(tileConf => {
                    return tileConf.near[axe] == null || tileConf.near[axe].includes(null)
                })
            }  

              
        })

        if (filterList.length == 0) {
            // this.tile.getLog()
        }
        console.log(">filterNearTiles", [...filterList])


        return filterList;
    }

    filterChoiseNearTile(buildTileList) {

        const filterList = this.filterNearTiles(buildTileList)
     
        const mrand = this.fg.getRandBuilding(this.x, this.y, 17, TILE_GEN_ZOOM)
        // const mrand =  Math.random()
        const pickedItemConf = pickRandomWeightedObject(filterList, mrand)
        if (pickedItemConf) {
            this.applyBuild(pickedItemConf)
        } else {
            const till = this.buildMarkNearTile();
            console.log('ERROR NOT FOUND ',  this, this.mustBeFill, till.map(t => [t.conf, t.mustBeFill]).flat());
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