/* 
key : 'name of asset in loader '
near : open position in near tile[ NW, NE , SE , SW ]
*/

import { WcBuildTile } from "./wcBuildTile.js";

// ====================================================
// ====================================================
// ====================================================

export class AbstractBuilding {
    constructor(world, conf) {
        this.world = world;
        this.fm = world.factoryMap;
        this.conf = conf; 

        this.allTileBuildingList = []
        // this.openList = []
    }
}

export class WcBuildingFactory extends AbstractBuilding{


    constructor(world, conf) {
        super(world, conf)
    }

    dist(x, y) {
        const xx = x - this.mainTile.x
        const yy = y - this.mainTile.y
        return Math.sqrt(xx * xx + yy * yy)
    }

    test(x, y) {
        this.conf.init();
        const buildTile = new WcBuildTile(this.world, this, x, y, 0)
        const validBuild = buildTile.pickTestAndUndo(this.conf.TILE_START_OPTIONS)
        // const validBuild = buildTile.pickAndApply(this.conf.TILE_START_OPTIONS)
        
        // buildTile.tile.wcBuild = null
        return validBuild
    }


    async start(x, y) {
        // Create the first building Tile :   
        this.mainLvl = this.fm.getTile(x, y).lvl   
        
        this.conf.mainLvl = this.mainLvl
        this.conf.init();        

        console.info('== Start Building')
        this.mainTile = new WcBuildTile(this.world, this, x, y, 0)
        if (!this.mainTile.pickAndApply(this.conf.TILE_START_OPTIONS)) {
            console.log("== Not posible to build")
            this.mainTile.tile.wcBuild = null
            return
        }

        console.log('== Start Building 2', this.conf.growLoopCount)

        this.updateAllListWithNearBuilding(this.mainTile)

        // console.log(this.openList)
        // this.openList = this.openList.sort((a, b) => a.score - b.score)

        for (let it = 0; it < this.conf.growLoopCount; it++) {
            console.log("-------------------------------", it , "-----------------")
            await new Promise(resolve => setTimeout(resolve, 50));

            // const sfxr = require("jsfxr").sfxr;
            var a = window.sfxr.toAudio("5CxcQvHmPLeugicoVTogZ3mnuVBwFq1VP5g3DiTq6o5YNwhnyH1Fpztvxu8zFyjj1jtnvad4nmooavzfeGadM2W3kA8qfvshWg5vj2tnHhd3MgZUG1TzaNKXu");
            a.play();

            const forcedList = this.forcedList
            if (forcedList.length > 0) {
                const popBuildTile = this.forcedList.shift();
    
                if (popBuildTile.randomConfig(0)) {
                    this.updateAllListWithNearBuilding(popBuildTile)
                }

                continue;
            } 

            const openList = this.openList
            if (openList.length > 0) {
                // console.log("OpenList", it, openList)
                const popBuildTile = openList.shift();
    
                if (popBuildTile.randomConfig(1)) {
                    this.updateAllListWithNearBuilding(popBuildTile)
                }

                continue;
            }
    
        }

        for (let it = 0; it < this.conf.endLoopMax; it++) {
            console.log("-------------------------------", it , "------------=====")
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // const sfxr = require("jsfxr").sfxr;
            var a = window.sfxr.toAudio("5CxcQvHmPLeugicoVTogZ3mnuVBwFq1VP5g3DiTq6o5YNwhnyH1Fpztvxu8zFyjj1jtnvad4nmooavzfeGadM2W3kA8qfvshWg5vj2tnHhd3MgZUG1TzaNKXu");
            a.play();


            const forcedList = this.forcedList
            if (forcedList.length > 0) {
                // console.log("ForceList", it, this.forcedList)
                const popBuildTile = this.forcedList.shift();
    
                if (popBuildTile.randomConfig(0)) {
                    this.updateAllListWithNearBuilding(popBuildTile)
                }
                continue;
            } 

            const openList2 = this.openList2
            if (openList2.length > 0) {
                // console.log("openList2", it, openList2)
                const popBuildTile = openList2.shift();
    
                if (popBuildTile.randomConfig(2)) {
                    this.updateAllListWithNearBuilding(popBuildTile)
                }
                continue;
            }
    
            const notConfiguredList = this.notConfiguredList
            if (notConfiguredList.length > 0) {
                // console.log("== notConfiguredList", it, notConfiguredList)
                const popBuildTile = notConfiguredList.shift();
    
                if (popBuildTile.randomConfig(0)) {
                    this.updateAllListWithNearBuilding(popBuildTile)
                }
                continue;
            }
            break;
        }

    }

    get notConfiguredList() {
        return this.allTileBuildingList.filter(tileBuild => {
            return !tileBuild.isConfigured  
        })
    }

    get forcedList() {
        return this.allTileBuildingList.filter(tileBuild => {
            return !tileBuild.isConfigured  
                && tileBuild.possibleFace.length == 1
        })
    }

    get openList() {
        return this.allTileBuildingList
            .filter(tileBuild => {
                return !tileBuild.isConfigured  
                    && tileBuild.expendPossibleFace.length > 0
                    && tileBuild.score > 0
            }).sort((a, b) => b.score - a.score)
    }

    get openList2() {
        return this.allTileBuildingList
            .filter(tileBuild => {
                return !tileBuild.isConfigured  
                    && tileBuild.closePossibleFace.length > 0
                    // && tileBuild.score > 0
            }).sort((a, b) => b.score - a.score)
    }

    updateAllListWithNearBuilding(tile) {
        // console.log(">> updateAllListWithNearBuilding")
        tile.nearBuilding.forEach(nearBuild => {
            if(nearBuild == null) return;
            if(this.allTileBuildingList.includes(nearBuild)) return;
            this.allTileBuildingList.push(nearBuild);
        });

    }



}

