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

export class WcBuilding extends AbstractBuilding{


    constructor(world, conf) {
        super(world, conf)
    }

    dist(x, y) {
        const xx = x - this.mainTile.x
        const yy = y - this.mainTile.y
        return Math.sqrt(xx * xx + yy * yy)
    }

    async start(x, y) {
        // Create the first building Tile :   
        this.mainLvl = this.fm.getTile(x, y).lvl   
        
        this.conf.mainLvl = this.mainLvl
        this.conf.init();        

        console.log('== Start Building')
        this.mainTile = new WcBuildTile(this.world, this, x, y, 0)
        const propTiles = this.mainTile._updatePosibleFace()

        console.log(propTiles)

        console.log('== Start Building 2')

        const buildTileConf = this.conf.TILE_START
 
        const validConf = this.mainTile.updateDrawConfiguration(buildTileConf);
        if (!validConf) {
            return 
        }
        console.log('== Start Building 3', this.conf.growLoopCount)

        this.updateAllListWithNearBuilding(this.mainTile)

        // console.log(this.openList)
        // this.openList = this.openList.sort((a, b) => a.score - b.score)

        for (let it = 0; it < this.conf.growLoopCount; it++) {
            console.log("-------------------------------", it , "-----------------")
            await new Promise(resolve => setTimeout(resolve, 10));

            // const sfxr = require("jsfxr").sfxr;
            //var a = window.sfxr.toAudio("34T6PkmBRh7nXfpAFeLJwuHBBMKjHw8RdGtvnsg8CxTsv9RN8LfGoRL3xRL3hnJ5KLt6YRerKhs4FUAYvUgogpGBhWMQruZbb5D5cw4eh2sVPNGNNSzks1m6m");
            //a.play();

            const forcedList = this.forcedList
            if (forcedList.length > 0) {
                // console.log("ForceList", it, this.forcedList)
                const popBuildTile = this.forcedList.shift();
    
                popBuildTile.randomConfig(0)
                this.updateAllListWithNearBuilding(popBuildTile)

                continue;
            } 

            const openList = this.openList
            if (openList.length > 0) {
                // console.log("OpenList", it, openList)
                const popBuildTile = openList.shift();
    
                popBuildTile.randomConfig(1)
                this.updateAllListWithNearBuilding(popBuildTile)

                continue;
            }
    
        }



        for (let it = 0; it < this.conf.endLoopMax; it++) {
            console.log("-------------------------------", it , "------------=====")
            await new Promise(resolve => setTimeout(resolve, 10));
            // const sfxr = require("jsfxr").sfxr;
            //var a = window.sfxr.toAudio("34T6PkmBRh7nXfpAFeLJwuHBBMKjHw8RdGtvnsg8CxTsv9RN8LfGoRL3xRL3hnJ5KLt6YRerKhs4FUAYvUgogpGBhWMQruZbb5D5cw4eh2sVPNGNNSzks1m6m");
            //a.play();


            const forcedList = this.forcedList
            if (forcedList.length > 0) {
                // console.log("ForceList", it, this.forcedList)
                const popBuildTile = this.forcedList.shift();
    
                popBuildTile.randomConfig(0)
                this.updateAllListWithNearBuilding(popBuildTile)

                continue;
            } 

            const openList2 = this.openList2
            if (openList2.length > 0) {
                // console.log("openList2", it, openList2)
                const popBuildTile = openList2.shift();
    
                popBuildTile.randomConfig(2)
                this.updateAllListWithNearBuilding(popBuildTile)
                continue;
            }
    
            const notConfiguredList = this.notConfiguredList
            if (notConfiguredList.length > 0) {
                // console.log("== notConfiguredList", it, notConfiguredList)
                const popBuildTile = notConfiguredList.shift();
    
                popBuildTile.randomConfig(0)
                this.updateAllListWithNearBuilding(popBuildTile)
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

