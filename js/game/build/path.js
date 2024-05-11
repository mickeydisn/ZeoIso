import { WcBuildConf_Path } from "./wcBuilding2/buildConf_path.js";
import {  BuildTile, WcBuildTile } from "./wcBuilding2/wcBuildTile.js";
import { AbstractBuilding } from "./wcBuilding2/wcBuildingFactory.js";


export class WcPath extends AbstractBuilding {
    constructor (world, tileList) {

        const buildConf = new WcBuildConf_Path()
        buildConf.init()
        super(world, buildConf);
        
        this.tileList = tileList;

        this.allTileBuildingList = []

        // this.start()
    }


    async start(time=50) {


        for( let it = 0; it < this.tileList.length; it++) {
        // for (let it = 0; it < 1; it++) {

            const tile =   this.tileList[it]          
            await new Promise(resolve => setTimeout(resolve, time));
            // const sfxr = require("jsfxr").sfxr;
            var a = window.sfxr.toAudio("34T6PkmBRh7nXfpAFeLJwuHBBMKjHw8RdGtvnsg8CxTsv9RN8LfGoRL3xRL3hnJ5KLt6YRerKhs4FUAYvUgogpGBhWMQruZbb5D5cw4eh2sVPNGNNSzks1m6m");
            a.play();
            // TODO :: Change the tile !!! 
            const bTile = tile.wcBuild ? tile.wcBuild : new WcBuildTile(this.world, this, tile.x, tile.y)
            bTile.isPath = 2
            // bTile.applyBuild(tileDrawConf)

            const tileDrawConf = this.conf.TILE_START
            bTile.updateDrawConfiguration(tileDrawConf)

            this.updateAllListWithNearBuilding(bTile);

        }

        for (let it = 0; it < this.conf.endLoopMax; it++) {
        // for (let it = 0; it < 0; it++) {
            await new Promise(resolve => setTimeout(resolve, time));
            // const sfxr = require("jsfxr").sfxr;
            var a = window.sfxr.toAudio("34T6PkmBRh7nXfpAFeLJwuHBBMKjHw8RdGtvnsg8CxTsv9RN8LfGoRL3xRL3hnJ5KLt6YRerKhs4FUAYvUgogpGBhWMQruZbb5D5cw4eh2sVPNGNNSzks1m6m");
            a.play();


            const forcedList = this.forcedList
            if (forcedList.length > 0) {
                const popBuildTile = this.forcedList.shift();
                const isConf = popBuildTile.randomConfig(0)
                if (isConf) {
                    popBuildTile.isPath = 1
                    this.updateAllListWithNearBuilding(popBuildTile)
                }

                continue;
            } 

            const openList2 = this.openList2
            if (openList2.length > 0) {
                const popBuildTile = openList2.shift();
                const isConf = popBuildTile.randomConfig(2)
                if (isConf) {
                    popBuildTile.isPath = true
                    this.updateAllListWithNearBuilding(popBuildTile)
                }
                continue;
            }
    
            break;
        }


    }

    get forcedList() {
        return this.allTileBuildingList.filter(tileBuild => {
            return !tileBuild.isConfigured  
                && tileBuild.possibleFace.length == 1
        })
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
        tile.nearBuilding.forEach(nearBuild => {
            if(nearBuild == null) return;
            if(this.allTileBuildingList.includes(nearBuild)) return;
            this.allTileBuildingList.push(nearBuild);
        });

    }

}


export class PathFactory {

	constructor(world, _conf) {
		this.world = world;
        this.fm = this.world.factoryMap
        this.ta = this.world.tilesActions
        const conf = {
            maxLvlDiff: 4,   
            propagateLimit: 2000,
            colapseLimit: 500,     
            ..._conf
        }
        Object.assign(this, conf);

        this.isValideTile = (tile) => {
            const isVal = tile => (tile.wcBuild && tile.wcBuild.isPath) || !tile.wcBuild
            return isVal(tile) && tile.nearTiles.filter(tile => isVal(tile)).length == 4
        }
    
        this.score = (t1, t2) => {
            const dist = PathFactory.tilesMoveCount(t1, t2)
            const distFactor = t1.wcBuild && t1.wcBuild.isPath ? t1.wcBuild.isPath : 0
            return dist - distFactor
        }
	}

    static tilesDistance(t1, t2) {
        const xd = Math.abs(Math.abs(t1.x) - Math.abs(t2.x))
        const yd = Math.abs(Math.abs(t1.y) - Math.abs(t2.y))
        return Math.sqrt(xd * xd + yd * yd)
    }

    static tilesMoveCount(t1, t2) {
        const xd = Math.abs(Math.abs(t1.x) - Math.abs(t2.x))
        const yd = Math.abs(Math.abs(t1.y) - Math.abs(t2.y))

        const diag = Math.abs(xd - yd)
        const line = Math.max(xd, yd) - diag
        return line + diag
    }

    createWcPath(pStart, pEnd) {
        this.tileStart = this.fm.getTile(pStart.x, pStart.y)
        this.tileEnd = this.fm.getTile(pEnd.x, pEnd.y)

        this.allList = []
        this.openList = []
        this.parentIndex = {}

        this.allList = [this.tileStart]
        const score = this.score(this.tileStart, this.tileEnd)
        this.openList.push({score:score, tile:this.tileStart})

        let i = 0;
        while (this.openList.length && i++ < this.propagateLimit && !this.allList.includes(this.tileEnd)) {
            this.propagate()
        } 

        if (this.allList.includes(this.tileEnd)) {

            const tileList = []
            let current = this.tileEnd
            let i = 0
            while (current && i++ < this.colapseLimit) {
                tileList.push(current)
                current = this.parentIndex[`${current.x}_${current.y}`]
            }
            return new WcPath(this.world, tileList)
        }
        return null
    }

    propagate() {
        this.openList = this.openList.sort((a, b) => a.score - b.score)
        const bestTileConf = this.openList.shift()
        const bestTile = bestTileConf.tile
        const nears = bestTile.nearTiles3
        const nearsNew = nears.filter(n => {
            const canMove =  PathFactory.canMove(bestTile, n)
            const isValide = this.isValideTile(n)
            const isNew = ! this.allList.includes(n) 
            return canMove && isNew && isValide
        })
        nearsNew.forEach(nearTile => {
            this.allList.push(nearTile)
            this.parentIndex[`${nearTile.x}_${nearTile.y}`] = bestTile
            const score = this.score(nearTile, this.tileEnd)
            this.openList.push({score:score, tile:nearTile})
        });

    }


    static canMove(t1, t2) {
        const t2_isBlock = t2.isBlock || Math.abs(t1.lvl - t2.lvl) > this.maxLvlDiff
        return !t2_isBlock
    }


}