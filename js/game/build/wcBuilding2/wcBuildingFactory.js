/* 
key : 'name of asset in loader '
near : open position in near tile[ NW, NE , SE , SW ]
*/

import { WcBuildConf_Base3 } from "./buildConf_base3.js";
import { WcBuildConf_BaseBorder3 } from "./buildConf_baseBorder3.js";
import { WcBuildConf_House3 } from "./buildConf_house3.js";
import { WcBuildConf_House3a } from "./buildConf_house3a.js";
import { WcBuildConf_House3b } from "./buildConf_house3b.js";
import { WcBuildConf_House4D } from "./buildConf_house4D.js";
import { WcBuildConf_House4a } from "./buildConf_house4a.js";
import { WcBuildConf_House4b } from "./buildConf_house4b.js";
import { WcBuildConf_House4c } from "./buildConf_house4c.js";
import { WcBuildConf_House5 } from "./buildConf_house5.js";
import { WcBuildConf_House6a } from "./buildConf_house6a.js";
import { WcBuildConf_Place3 } from "./buildConf_place3.js";
import { WcBuildTile } from "./wcBuildTile.js";

// ====================================================
// ====================================================
// ====================================================

export class AbstractBuilding {
    constructor(world, conf) {
        this.world = world;
        this.fm = world.factoryMap;
        this.conf = conf; 

        // Create by Child
        this._wcBuildChilds = []


        // Use on propagation
        this.allTileBuildingList = []
        // this.openList = []
    }


    addChild(wcBuild) {
        if (!this._wcBuildChilds.includes(wcBuild)) {
            this._wcBuildChilds.push(wcBuild)
        }
    }
    removeChild(wcBuild) {
        const idx = this._wcBuildChilds.indexOf(wcBuild)
        if (idx) this._wcBuildChilds.slice(idx, 1);
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
        if (!validBuild) {
            this._wcBuildChilds.forEach(t => {
                t.removeBuilding()

            })
        }
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
            return false
        }

        console.log('== Start Building 2', this.conf.growLoopCount)
        // console.log(this.mainTile)
        this.updateAllListWithnearWcBuild(this.mainTile)

        // console.log(this.openList)
        // this.openList = this.openList.sort((a, b) => a.score - b.score)

        for (let it = 0; it < this.conf.growLoopCount; it++) {
            // console.log("-------------------------------", it , "-----------------")
            await new Promise(resolve => setTimeout(resolve, 50));

            // const sfxr = require("jsfxr").sfxr;
            var a = window.sfxr.toAudio("5CxcQvHmPLeugicoVTogZ3mnuVBwFq1VP5g3DiTq6o5YNwhnyH1Fpztvxu8zFyjj1jtnvad4nmooavzfeGadM2W3kA8qfvshWg5vj2tnHhd3MgZUG1TzaNKXu");
            a.play();

            const forcedList = this.forcedList
            if (forcedList.length > 0) {
                const popBuildTile = this.forcedList.shift();
    
                if (popBuildTile.randomConfig(0)) {
                    this.updateAllListWithnearWcBuild(popBuildTile)
                }

                continue;
            } 

            const openList = this.openList
            if (openList.length > 0) {
                // console.log("OpenList", it, openList)
                const popBuildTile = openList.shift();
    
                if (popBuildTile.randomConfig(1)) {
                    this.updateAllListWithnearWcBuild(popBuildTile)
                }

                continue;
            }
    
        }

        for (let it = 0; it < this.conf.endLoopMax; it++) {
            // console.log("-------------------------------", it , "------------=====")
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // const sfxr = require("jsfxr").sfxr;
            var a = window.sfxr.toAudio("5CxcQvHmPLeugicoVTogZ3mnuVBwFq1VP5g3DiTq6o5YNwhnyH1Fpztvxu8zFyjj1jtnvad4nmooavzfeGadM2W3kA8qfvshWg5vj2tnHhd3MgZUG1TzaNKXu");
            a.play();


            const forcedList = this.forcedList
            if (forcedList.length > 0) {
                // console.log("ForceList", it, this.forcedList)
                const popBuildTile = this.forcedList.shift();
    
                if (popBuildTile.randomConfig(0)) {
                    this.updateAllListWithnearWcBuild(popBuildTile)
                }
                continue;
            } 

            const openList2 = this.openList2
            if (openList2.length > 0) {
                // console.log("openList2", it, openList2)
                const popBuildTile = openList2.shift();
    
                if (popBuildTile.randomConfig(2)) {
                    this.updateAllListWithnearWcBuild(popBuildTile)
                }
                continue;
            }
    
            const notConfiguredList = this.notConfiguredList
            if (notConfiguredList.length > 0) {
                // console.log("== notConfiguredList", it, notConfiguredList)
                const popBuildTile = notConfiguredList.shift();
    
                if (popBuildTile.randomConfig(0)) {
                    this.updateAllListWithnearWcBuild(popBuildTile)
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

    updateAllListWithnearWcBuild(tile) {
        // console.log("tile.nearWcBuild", tile.nearWcBuild)
        tile.nearWcBuild.forEach(nearBuild => {
            if(nearBuild == null) return;
            if(this.allTileBuildingList.includes(nearBuild)) return;
            this.allTileBuildingList.push(nearBuild);
        });

    }



}


export class WcBuildingFactory2 extends WcBuildingFactory{
    constructor(world, conf) {

        // console.log(conf)
        const growLoopCount = conf.growLoopCount ? conf.growLoopCount : 10

		const buildConf = conf.buildType == null ? null :
			conf.buildType.localeCompare("place3") == 0 ?  new WcBuildConf_Place3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("base3") == 0 ?  new WcBuildConf_Base3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("baseBorder3") == 0 ?  new WcBuildConf_BaseBorder3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house3") == 0 ?  new WcBuildConf_House3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house3a") == 0 ?  new WcBuildConf_House3a({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house3b") == 0 ?  new WcBuildConf_House3b({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4a") == 0 ?  new WcBuildConf_House4a({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4b") == 0 ?  new WcBuildConf_House4b({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4c") == 0 ?  new WcBuildConf_House4c({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4D") == 0 ?  new WcBuildConf_House4D({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house5") == 0 ?  new WcBuildConf_House5({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house6a") == 0 ?  new WcBuildConf_House6a({growLoopCount:growLoopCount}) :
			null


        super(world, buildConf)
    }
}