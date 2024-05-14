import {AXE_DIRECTION} from "../utils.js";
import { pickRandomWeightedObject } from "./AbstractBuildConf.js";


export class BuildTile {
    constructor(world, buildFactory, x, y) {
        this.world = world;
        this.fm = world.factoryMap;
        this.fg = world.factoryGenerator;
        this.ta = this.world.tilesActions

        this.buildFactory = buildFactory;
        this.buildFactory.addChild(this);

        this.x = x;
        this.y = y;

        this.tile = this.fm.getTile(this.x, this.y)
        this.tile.wcBuild = this;
        this.isConfigured = false;        
        this.drawConf = {}
    }

    removeBuilding() {
        this.buildFactory.removeChild(this)
        this.tile.wcBuild = null
    }

    get nearWcBuild() {
        return this.tile.nearTiles.map(tile => {
            return tile.wcBuild
        }) 
    }
    
    _applyBuildItemList(drawConf) {
        this.ta.clearItem({x:this.x, y:this.y})
        
        drawConf.items.forEach(item => {
            const h = item.h ? item.h : 0
            if ( item.key) {
                this.ta.itemAddKey({x:this.x, y:this.y, assetKey:item.key, h:h})
            }
        })
        
    }
    _applyBuildFunction(drawConf) {
        const funcs = drawConf.functions
        funcs.forEach(conf => {
            // console.log('Do Actionn' , {x:this.x, y:this.y, ...conf})
            this.ta.doAction({x:this.x, y:this.y, ...conf})
        })
    }

    applyBuild(drawConf) {
        if (drawConf.color) {
            this.ta.doAction({func:'colorSquare', x: this.x, y: this.y, size:1, color:drawConf.color})
        }

        if (drawConf.functions) {
            this._applyBuildFunction(drawConf) 
        } 

        if (drawConf.empty) {
            this.ta.doAction({func:'clearItem', x: this.x, y: this.y})
        } 
        if (drawConf.items ) {
            this.ta.doAction({func:'clearItem', x: this.x, y: this.y})
            this._applyBuildItemList(drawConf)
        } else {
            if (drawConf.key) {
                this.ta.doAction({func:'clearItem', x: this.x, y: this.y})
                const h = drawConf.h ? drawConf.h : 0
                this.ta.doAction({func:'itemForceKey', x: this.x, y: this.y, assetKey:drawConf.key, h:h})
            }
        }
        
        if (drawConf.lvl) {
            this.ta.doAction({func:'lvlSet', x: this.x, y: this.y, lvl:drawConf.lvl})
        }

        if (!drawConf.allowMove) {
            this.ta.doAction({func:'setBlocked', x: this.x, y: this.y, isBlock:true})
        }

        if (drawConf.isFrise) {
            this.ta.doAction({func:'setFrise', x: this.x, y: this.y, isFrise:true})
        }
    }

    toJson() {
        return {
            isConfigured: this.isConfigured,
        }
    }

}



export class WcBuildTile extends BuildTile {

    constructor(world, build, x, y, _propagateNumber=0) {
        super(world, build, x, y)
        this._propagateNumber = _propagateNumber;

        this._buildTileConf = {
            face:[null, null, null, null],
        }
        this.isConfigured = false;
        this._nearTiles = null

        this.possibleFace = [...this.buildFactory.conf.listFaceKey]

        // check close validation 

    }


    get nearFaceValidation() {
        return this.nearWcBuild.map((b , idx) => {
            const axeNear = (idx + 2) % 4
            return !b ? null : b.faceValidation[axeNear]
        })
    }

    tryFaceConfiguration(face){
        this.savePossibleFace = this.possibleFace;

        this.possibleFace = [face]
        const propTiles = this._propagate();
        return [...new Set([this, ...propTiles])]
    }
    undoFaceConfiguration(propTiles) {
        propTiles.forEach(tile => {
            if (tile == null) return;
            if (typeof tile.savePossibleFace === 'string') {
                console.log('UNDO', tile.savePossibleFace)
                tile.tile.wcBuild = null;
            } else {
                tile.possibleFace = tile.savePossibleFace ? tile.savePossibleFace : tile.possibleFace
            }
            tile.savePossibleFace = null;
        })
    }
    tryApplyFaceConfigurationAndUndo(face) {
        const propTiles = this.tryFaceConfiguration(face)
 
        if (propTiles.includes(null)) {
            // undo propagation
            this.undoFaceConfiguration(propTiles)
            return false;
        } else {
            // clear undo 
            this.undoFaceConfiguration(propTiles)
            return true
        }

    }
    tryApplyFaceConfiguration(face) {
        const propTiles = this.tryFaceConfiguration(face)
 
        if (propTiles.includes(null)) {
            this.undoFaceConfiguration(propTiles)
            return false;
        } else {
            propTiles.forEach(tile => {
                tile.savePossibleFace = null;
            })
            return true
        }
                    
    }
    updateDrawConfiguration(drawConf) {
 
        const propTilesValide = this.tryApplyFaceConfiguration(drawConf.face)
 
        if (propTilesValide) {
            // Apply Config
            this.applyBuild(drawConf);
            this._buildTileConf = drawConf;
            this.isConfigured = true;
            return true
        }
        return false;
    }

    /** 
     * Apply the Current possibleFace configuration to the Neigth and propaged
     * 
     * Foreach 4 axes neighbor tiles , propagate the face  configuration . 
    */
    _propagate(idxP=0) {

        const propTiles = [];
        let isError = false

        // When building a configuration we propagate the contrainte over the neighbor
        // check aroung the tile
        for (let axe = 0; axe < 4; axe++) {
            // console.log("==".repeat(idxP+1), `p:${idxP}:axe:${axe} `, '_propagate') // ,  this.possibleFace, this.nearWcBuild);

            // get the list of all posible link of on an axe
            const nearAxeFace = [...new Set(this.possibleFace.map(f => f[axe]))]

            // if null is possible we stop the recurtion
            if (nearAxeFace.includes(null) || nearAxeFace.includes('X')) {
                continue
            }
            // if the neighbor tileBuilding , create a new one 
            if (this.nearWcBuild[axe] == null) {
                const [dx, dy] = AXE_DIRECTION[axe]
                const newBuildTile = new WcBuildTile(this.world, this.buildFactory, this.x + dx , this.y + dy, this._propagateNumber+1);
                newBuildTile.savePossibleFace = "NEW"
                this.nearWcBuild[axe] = newBuildTile
                const propAxeTiles = newBuildTile._updatePosibleFace()
                propTiles.push(propAxeTiles)
                isError = propAxeTiles.includes(null)
                if (isError) break;
                //   sqdqsd
            }
            // if the neighbor is alredy configured
            if (this.nearWcBuild[axe].isConfigured) {
                continue 
;            }
            // build the list of match for this axe ( = reverse the link )
            const nearMatch = [...new Set(nearAxeFace.map(face => this.buildFactory.conf.reverseFaceLinkList(face)).flat())]
            // console.log(axe, nearAxeFace, nearMatch)

            /// probagate the match filter
            const propAxeTiles = this.nearWcBuild[axe]._propagatePosibleFace((axe + 2) % 4, nearMatch, idxP)
            propTiles.push(propAxeTiles)
            isError = propAxeTiles.includes(null)
            if (isError) break;
        }
        
        return [...new Set(propTiles.flat())]
    }


    _propagatePosibleFace(axe, nearMatch, idxP=0) {
        this.savePossibleFace = this.savePossibleFace ? this.savePossibleFace : this.possibleFace;
        const length = this.possibleFace.length
        // console.log("--".repeat(idxP+1) , `p:${idxP}:axe:${axe} `) // , '_propagatePosibleFace', nearMatch,  this.possibleFace)

        // Filter the existing list of possibleFace with Match on the axe 
        this.possibleFace = this.possibleFace.filter(face => {
            return nearMatch.includes(face[axe]) 
        })
        if (this.possibleFace.length == 0) {
            // this.tile.color = [255, 255, 255];
            // console.error('====Error Propage Possible Face lenght : 0')
            // console.error('nearMatch', this, axe,  nearMatch, idxP)
            return [this, null];
        }

        // if have change - Propage to neighbor
        if (this.possibleFace.length < length && idxP < 5) {
            const propTiles = this._propagate(idxP+1)
            return [this, ...propTiles]
        }
        // No propagation / End of progapagtion 
        return [this]
    }



    _updatePosibleFace() {
        const propTiles = [];
        let isError = true;
        // check aroung the tile
        // [0, 1, 2, 3].forEach(axe => {
        for (let axe = 0; axe < 4; axe++) {
            // console.log(">>".repeat(0+1) , `p:${0}:axe:${axe} `,  this.possibleFace) // , '_propagatePosibleFace', nearMatch,  this.possibleFace)
        
            // get the list of all posible link of on an axe
            // const nearAxeFace = [...new Set(possibleFace.map(f => f[axe]))]

            // if the neighbor is empty no need to filter the posible Face
            if (this.nearWcBuild[axe] == null) {
                continue 
            }

            const nearPosibleFace = this.nearWcBuild[axe].possibleFace
            const nearAxeFace = [...new Set(nearPosibleFace.map(f => f[(axe + 2) % 4]))]
            const nearMatch = [...new Set(nearAxeFace.map(face => this.buildFactory.conf.reverseFaceLinkList(face)).flat())]
            const propAxeTiles = this._propagatePosibleFace(axe, nearMatch, 0)
            propTiles.push(propAxeTiles)
            isError = propAxeTiles.includes(null)
            if (isError) break;
        }
        return [...new Set(propTiles.flat())]
    }


    _isBuildFace(axe) {
        const nearB = this.nearWcBuild[axe]
        return nearB != null && nearB.isConfigured 
    }

    /*
    get startPossibleFace() {

        
    }
    */

    get closePossibleFace() {
        const faceWeightIndex = this.buildFactory.conf.faceLinkWeight
        const filteredPossibleFace = this.possibleFace
            .filter(face => {
                const alowFaceKey = face
                    .filter((faceKey, axe) => {
                        if (this._isBuildFace(axe)) return true
                        if (faceKey == null) return true // this.nearWcBuild[axe] == null
                        if (Object.keys(faceWeightIndex).includes(faceKey)
                                && faceWeightIndex[faceKey] > 0
                            ) {
                            return true;
                        }
                        return false
                    })
                return alowFaceKey.length == 4
            })

        const soredList = filteredPossibleFace
            .map(face => {
                const scoreFace = face
                    .map(faceKey => Object.keys(faceWeightIndex).includes(faceKey) ? faceWeightIndex[faceKey] : 0)
                    .reduce((acc, v) => acc + v, 0)
                return [face, scoreFace]
            })
            .sort((a, b) => a[1] - b[1])
            .map(x => x[0])

        return soredList.length ? [soredList[0]] : []
    }


    get expendPossibleFace() {
        // console.log('ExpendPossibleFace:', {...this.possibleFace})
        const faceWeightIndex = this.buildFactory.conf.faceLinkWeight
        return this.possibleFace
            .filter(face => {
                const alowFaceKey = face
                    .filter((faceKey, axe) => {
                        if (this._isBuildFace(axe)) return true;
                        // if (faceKey == null) return true; //this.nearWcBuild[axe] == null;
                        if (Object.keys(faceWeightIndex).includes(faceKey) && faceWeightIndex[faceKey] > 0) {
                            return true;
                        }
                        return false
                    })
                return alowFaceKey.length == 4
            })
    }


    pickTestAndUndo(tileConfigurations) {
        // Pick and apply config to the tile
        let listList = [...tileConfigurations]
        let pickTileConf = pickRandomWeightedObject(listList, this.tile.rBuildTile)
        let validConf = false
        while (listList.length > 0 && !validConf) {
            validConf = this.tryApplyFaceConfigurationAndUndo(pickTileConf.face)
            if (validConf) return true;
            
            // console.log('BAD CHOISE')
            listList = listList.filter(x => x != pickTileConf)
            pickTileConf = pickRandomWeightedObject(listList, this.tile.rBuildTile)
        }
        console.log('ALMOST BAD CHOISE')
        return false
        
    }

    pickAndApply(tileConfigurations) {

        // Pick and apply config to the tile
        let listList = [...tileConfigurations]
        let pickTileConf = pickRandomWeightedObject(listList, this.tile.rBuildTile)
        let validConf = false
        while (listList.length > 0 && !validConf) {
            validConf = this.updateDrawConfiguration(pickTileConf)
            if (validConf) return true;
            
            // console.log('BAD CHOISE')
            listList = listList.filter(x => x != pickTileConf)
            pickTileConf = pickRandomWeightedObject(listList, this.tile.rBuildTile)
        }

        console.log('ALMOST BAD CHOISE')
        this.isConfigured = true
        this._buildTileConf.face = [null, null, null, null]
        return false
    }

    /*
    updateFaceValide() {
        const nearFaceValidation = this.nearFaceValidation
    }
    */
    randomConfig(expendState=0) {

        // const alowFace =  this.possibleFace
        const alowFace = 
            expendState == 0 ? [...this.possibleFace] :
            expendState == 1 ? this.expendPossibleFace : 
            expendState == 2 ? this.closePossibleFace :
            []


        // get all tile Config from the faceKey
        const keyFace = alowFace.map(x => x.join('|'))
        const tileConf = keyFace.map(key => {
            return this.buildFactory.conf.indexTileOptions_KeyFaceKey[key]
        }).flat().filter(x => x)


        // Dont find any Tile config match to math
        if (tileConf.length <= 0) {
            this.possibleFace = []
            this.isConfigured = true;

            console.log("========Error-random", this)
            // console.log("indexTileOptions", keyFace)
            return false;
        } 
        return this.pickAndApply(tileConf)
    }

    get score() {
        const faceWeightIndex = this.buildFactory.conf.faceLinkWeight
        const scoreWeigthFace = this.possibleFace
            .map(face => {
                return [0, 1, 2, 3]
                    .filter(axe => this.nearWcBuild[axe] != null &&  this.nearWcBuild[axe].isConfigured)
                    .map(axe => 
                        Object.keys(faceWeightIndex).includes(face[axe]) ? faceWeightIndex[face[axe]] : 0
                    )
            })   
            .flat()
        const maxScoreFoce = scoreWeigthFace.reduce((acc, v) => Math.max(acc, v), 0)
        return 1000000 - this._propagateNumber + maxScoreFoce

    }

    toJson() {
        return {
            isPath: this.isPath,
            isConfigured: this.isConfigured,
            confFace : this._buildTileConf.face.join('|'),
            score : this.score,
            // possibleFace: this.possibleFace.map(x => x.join('|')),
        }
    }

}

