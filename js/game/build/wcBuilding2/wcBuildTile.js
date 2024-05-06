import {AXE_DIRECTION} from "../utils.js";
import { pickRandomWeightedObject } from "./AbstractBuildConf.js";


export class BuildTile {
    constructor(world, build, x, y) {
        this.world = world;
        this.fm = world.factoryMap;
        this.fg = world.factoryGenerator;
        this.ta = this.world.tilesActions

        this.building = build;
        this.x = x;
        this.y = y;

        this.tile = this.fm.getTile(this.x, this.y)
        this.tile.buildTile = this;
        this.isConfigured = false;
        
        this.drawConf = {}

    }


    get nearBuilding() {
        return this.tile.nearTiles.map(tile => {
            return tile.buildTile
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

        this.possibleFace = [...this.building.conf.listFaceKey]

        // check close validation 

    }


    get nearFaceValidation() {
        return this.nearBuilding.map((b , idx) => {
            const axeNear = (idx + 2) % 4
            return !b ? null : b.faceValidation[axeNear]
        })
    }

    /*
    set buildTileConf(drawConf) {
        // Validation ? 
        // this.tile.color = [128, 128, 128];
        this.possibleFace = [drawConf.face]
        this.isConfigured = true;
        console.log('===BUILD', drawConf)
        const propTiles = this._propagate();
        console.log(propTiles)

        if (propTiles.includes(null)) {
            console.log("Error")
            throw "Error"
        } else {
            this.applyBuild(drawConf);
            this._buildTileConf = drawConf;
        }

    }
    */

    tryFaceConfiguration(faces){
        this.savePossibleFace = this.possibleFace;

        this.possibleFace = [faces]
        const propTiles = this._propagate();
        return [...new Set([this, ...propTiles])]
    }
    updateDrawConfiguration(drawConf) {
 
        const propTiles = this.tryFaceConfiguration(drawConf.face)
 
        if (propTiles.includes(null)) {
            // undo propagation
            console.log('UNDO -- ', propTiles)
            propTiles.forEach(tile => {
                if (tile == null) return;
                if (typeof tile.savePossibleFace === 'string') {
                    console.log('UNDO', tile.savePossibleFace)
                    tile.tile.buildTile = null;
                } else {
                    tile.possibleFace = tile.savePossibleFace ? tile.savePossibleFace : tile.possibleFace
                }
                tile.savePossibleFace = null;
            })
            return false;
        } else {
            // clear undo 
            propTiles.forEach(tile => {
                tile.savePossibleFace = null;
            })
            // Apply Config
            this.applyBuild(drawConf);
            this._buildTileConf = drawConf;
            this.isConfigured = true;
            return true
        }

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
            // console.log("==".repeat(idxP+1), `p:${idxP}:axe:${axe} `, '_propagate') // ,  this.possibleFace, this.nearBuilding);

            // get the list of all posible link of on an axe
            const nearAxeFace = [...new Set(this.possibleFace.map(f => f[axe]))]

            // if null is possible we stop the recurtion
            if (nearAxeFace.includes(null) || nearAxeFace.includes('X')) {
                continue
            }
            // if the neighbor tileBuilding , create a new one 
            if (this.nearBuilding[axe] == null) {
                const [dx, dy] = AXE_DIRECTION[axe]
                const newBuildTile = new WcBuildTile(this.world, this.building, this.x + dx , this.y + dy, this._propagateNumber+1);
                newBuildTile.savePossibleFace = "NEW"
                this.nearBuilding[axe] = newBuildTile
                const propAxeTiles = newBuildTile._updatePosibleFace()
                propTiles.push(propAxeTiles)
                isError = propAxeTiles.includes(null)
                if (isError) break;
                //   sqdqsd
            }
            // if the neighbor is alredy configured
            if (this.nearBuilding[axe].isConfigured) {
                continue 
;            }
            // build the list of match for this axe ( = reverse the link )
            const nearMatch = [...new Set(nearAxeFace.map(face => this.building.conf.reverseFaceLinkList(face)).flat())]
            // console.log(axe, nearAxeFace, nearMatch)

            /// probagate the match filter
            const propAxeTiles = this.nearBuilding[axe]._propagatePosibleFace((axe + 2) % 4, nearMatch, idxP)
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
            this.tile.color = [255, 255, 255];
            console.log('====Error Propage Possible Face lenght : 0')
            console.log('nearMatch', this,  nearMatch, idxP)
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
            if (this.nearBuilding[axe] == null) {
                continue 
            }

            const nearPosibleFace = this.nearBuilding[axe].possibleFace
            const nearAxeFace = [...new Set(nearPosibleFace.map(f => f[(axe + 2) % 4]))]
            const nearMatch = [...new Set(nearAxeFace.map(face => this.building.conf.reverseFaceLinkList(face)).flat())]
            const propAxeTiles = this._propagatePosibleFace(axe, nearMatch, 0)
            propTiles.push(propAxeTiles)
            isError = propAxeTiles.includes(null)
            if (isError) break;
        }
        return [...new Set(propTiles.flat())]
    }





    get closePossibleFace() {
        const maskBuildFace = [0, 1, 2, 3].map(axe => {
            const nearB = this.nearBuilding[axe]
            return nearB != null && nearB.isConfigured 
        })

        const faceWeightIndex = this.building.conf.faceLinkWeight
        const filteredPossibleFace = this.possibleFace
            .filter(face => {
                const alowFaceKey = face
                    .filter((faceKey, axe) => {
                        if (maskBuildFace[axe]) return true
                        if (faceKey == null) return true // this.nearBuilding[axe] == null
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
        const maskBuildFace = [0, 1, 2, 3].map(axe => {
            const nearB = this.nearBuilding[axe]
            return nearB != null && nearB.isConfigured 
        })

        // console.log('ExpendPossibleFace:', {...this.possibleFace})
        const faceWeightIndex = this.building.conf.faceLinkWeight
        return this.possibleFace
            .filter(face => {
                const alowFaceKey = face
                    .filter((faceKey, axe) => {
                        if (maskBuildFace[axe]) return true;
                        // if (faceKey == null) return true; //this.nearBuilding[axe] == null;
                        if (Object.keys(faceWeightIndex).includes(faceKey) && faceWeightIndex[faceKey] > 0) {
                            return true;
                        }
                        return false
                    })
                return alowFaceKey.length == 4
            })
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
            return this.building.conf.indexTileOptions_KeyFaceKey[key]
        }).flat().filter(x => x)


        // Dont find any Tile config match to math
        if (tileConf.length <= 0) {
            this.possibleFace = []
            this.isConfigured = true;

            console.log("========Error-random", this)
            console.log("indexTileOptions", keyFace)
            return ;
        } 
        
        // Pick and apply config to the tile
        {
            let listList = [...tileConf]
            let pickTileConf = pickRandomWeightedObject(listList, this.tile.rBuildTile)
            let validConf = false
            while (listList.length > 0 && !validConf) {
                validConf = this.updateDrawConfiguration(pickTileConf)
    
                if (!validConf) {
                    console.log('BAD CHOISE')
                    listList = listList.filter(x => x != pickTileConf)
                    pickTileConf = pickRandomWeightedObject(listList, this.tile.rBuildTile)
                    // throw("BAD CHOISE")
                }
            }
            if (listList.length == 0) {
                console.log('ALMOST BAD CHOISE')
                this.isConfigured = true
                this._buildTileConf.face = [null, null, null, null]
            }
        }
    }

    get score() {
        const faceWeightIndex = this.building.conf.faceLinkWeight
        const scoreWeigthFace = this.possibleFace
            .map(face => {
                return [0, 1, 2, 3]
                    .filter(axe => this.nearBuilding[axe] != null &&  this.nearBuilding[axe].isConfigured)
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
            score : this.score,
            possibleFace: this.possibleFace.map(x => x.join('|')),
            confFace : this._buildTileConf.face.join('|'),
        }
    }

}

