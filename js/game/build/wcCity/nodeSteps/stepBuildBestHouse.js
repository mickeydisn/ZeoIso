import { WcBuildingFactory2 } from "../../wcBuilding2/wcBuildingFactory.js"
import { CitNodeGrave } from "../config/cityNodeGrave.js"
import { CitNodeHouse } from "../config/cityNodeHouse.js"
import { CitNodeLab } from "../config/cityNodeLab.js"
import { cityNode_do_Steps } from "../config/defaultCity.js"
import { SUBSTEP_ERROR, SUBSTEP_WATTING, abstractStep } from "./abstractStep.js"


/* {
    buildType:bType,
    growLoopCount:gCount,
} */ 
const SUBSTEP_BuildingHouseStarConf = (buildingConfig) => {return {...abstractStep,
    text: `> ## House Configuration. ... `, 

    isValidated: (cityNode) => !cityNode.sData,

    doEnter: (cityNode, callback=_ => {} ) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        cityNode.sData = {
            isWaiting:false,
            buildingConfig : buildingConfig,
            possibleTiles: null,
            selectedTile: null,
        }
        callback()
    },
}}


const SUBSTEP_BuildingHouseCheck =  {...abstractStep,
    text: `> ## Check the configuration ... `, 

    isValidated: (cityNode) => cityNode.sData && cityNode.sData.buildingConfig && cityNode.sData.possibleTiles === null,
 
    doEnter: (cityNode, callback=_ => {}) => { 
        // Check for all Possible Tile To build a House around the node

        cityNode.sData.possibleTiles = []
        cityNode.sData.selectedTile = null

        const allTileAround = []
        const isValid = (tile) => (!tile.wcBuild)

        // loop on city node road
        cityNode.roads.forEach(road => {
            // foreach tile of the road
            road.wcPath.tileList.forEach(roadTile => {
                // look to tile around the path 
                const nearRoadTile = [...roadTile.nearTilesAxe(3), ...roadTile.nearTilesAxe(4)];
                nearRoadTile.forEach(nTile => {
                    if (allTileAround.includes(nTile)) return ;
                    allTileAround.push(nTile)
                    if (
                        isValid(nTile) 
                        && nTile.nearTiles.filter(t => isValid(t)).length === 4
                        && nTile.nearCrossTiles.filter(t => isValid(t)).length === 4
                    ) {
                        const n = nTile
                        cityNode.sData.possibleTiles.push(nTile)
                    }
                })

            })
        })

        // Comput the best Node to build the building (
            //  - Check the WC propagation on each node before reture a valide one . )

        const sortedPosibleTile = cityNode.sData.possibleTiles
            .map(tile => {return {score:cityNode.nodeDistance(tile), tile:tile}})
            .sort((a, b) => a.score - b.score)

        let validBuild = false
        // const HOUSE_CONFIGURATION = new WcBuildConf_House3a({growLoopCount:10})
        // const building = new WcBuildingFactory(cityNode.world, HOUSE_CONFIGURATION)
        const building = new WcBuildingFactory2(cityNode.world, cityNode.sData.buildingConfig)// HOUSE_CONFIGURATION)

        while (!validBuild && sortedPosibleTile.length != 0) {
            let n = sortedPosibleTile.shift().tile
            validBuild = building.test(n.x, n.y)
            if (!validBuild) {
                cityNode.sData.possibleTiles = cityNode.sData.possibleTiles.filter(t => t != n)
            } else {
                cityNode.sData.selectedTile = n
            }
        }

        /*
        cityNode.GS.set("TileClickFunction", { 
            func:'doFunction', do: (x, y) => {
                const select = cityNode.sData.possibleTiles.filter(n => n.x === x && n.y === y)

                if (select.length) {
                    const n = select[0]
                    cityNode.sData.selectedTile = n
                    cityNode.ta.doAction({func:'clearAllTemporatyItems'})
                    cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:this.asset.key})
                    this.GS.set("TileClickFunction", null)
                } else {
                    // cityNode.sData.selectedTile = null
                    // this.GS.set("TileClickFunction", null)
                }
            }, callback:callback
        })
        */

        callback()
    },
}


// Node Valide Not Exist
const stepNoWai ={...abstractStep,
    text: ` > # House can be construct ... `, 
    isValidated: (cityNode) => cityNode.sData && cityNode.sData.possibleTiles &&  cityNode.sData.possibleTiles.length === 0,
}



// Node Is Selected Ready to be Build 
const SUBSTEP_BuildingHouseFinal = {...abstractStep,
    text: ` > Build the house Auto`, 
    isValidated: (cityNode) =>  cityNode.sData && cityNode.sData.selectedTile != null,

    doEnter: (cityNode, callback=_ => {}, callFirst=null) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        // const HOUSE_CONFIGURATION = new WcBuildConf_House3b({growLoopCount:5})
        // const HOUSE_CONFIGURATION = new WcBuildConf_House4a({growLoopCount:5})
        const building = new WcBuildingFactory2(cityNode.world, cityNode.sData.buildingConfig)// HOUSE_CONFIGURATION)
        const n = cityNode.sData.selectedTile
        building.start(n.x, n.y).then(_ => {
            const buildingConfig = cityNode.sData.buildingConfig
            const cityNodeHouse = n.cityNode ? n.cityNode 
                : buildingConfig.buildType === 'house3b' ? new CitNodeHouse(cityNode.world, cityNode.cityFactory, n)
                : buildingConfig.buildType === 'house4a' ? new CitNodeLab(cityNode.world, cityNode.cityFactory, n)
                : buildingConfig.buildType === 'house6a' ? new CitNodeGrave(cityNode.world, cityNode.cityFactory, n)
                :  new CitNodeHouse(cityNode.world, cityNode.cityFactory, n)
            cityNodeHouse.buildFactory = building;
            cityNode.sData = null
            cityNode.homeStep()
            callback(); 
        })
        cityNode.sData.isWaiting = true
        callFirst ? callFirst() : callback(); 
    }
}



export const CREATE_SUBSTEP_BUILD = (buildingConfig) => {return {...abstractStep, 
    text: `> ### Build the House `,
    isValidated: (cityNode) => true,
    
    doEnter_new : (cityNode, callback=_ => {})  => {
        console.log(`> ### Build the HOUSE `, buildingConfig)
        const startConf = SUBSTEP_BuildingHouseStarConf(buildingConfig)
        cityNode_do_Steps(cityNode, [
            startConf,
            SUBSTEP_BuildingHouseCheck,
            SUBSTEP_BuildingHouseFinal,
        ], callback)
        // callback()
    },


    doEnter: (cityNode, callback=_ => {}, callFirst=_ => {}) => {
        const fError = _ => {
            cityNode.homeStep()
            callback(); 
        }
        const fFinal = _ => {
            if (SUBSTEP_BuildingHouseFinal.isValidated(cityNode)) {
                SUBSTEP_BuildingHouseFinal.doEnter(cityNode, callback, callFirst)
            } else {
                fError()
            }
        }

        const fChoiseBest = _ => {
            if (SUBSTEP_BuildingHouseCheck.isValidated(cityNode)) {
                SUBSTEP_BuildingHouseCheck.doEnter(cityNode, fFinal)
            } else {
                fError()
            }
        }
        const fCheckPathStart = _ => {
            const startStep = SUBSTEP_BuildingHouseStarConf(buildingConfig)
            if (startStep.isValidated(cityNode)) {
                startStep.doEnter(cityNode, fChoiseBest)
            } else {
                fError()
            }
        }
        fCheckPathStart()
    }
}}

// ----------------



// Node Is Selected Ready to be Build 
const SUBSTEP_BuildingHouseFinalCheck = {...abstractStep,
    text: ` > Build the house `, 
    isValidated: (cityNode) =>  SUBSTEP_BuildingHouseFinal.isValidate(cityNode),

    doEnter: (cityNode, callback=_ => {}) => { 
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        cityNode.sData.possibleTiles.forEach(n => {
            cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:"mushroom_red_NW#_C130_B110_I1_R3"})
        })

        if (cityNode.sData.selectedTile) {
            const n = cityNode.sData.selectedTile
            cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:[
                "mushroom_red_NW#H100_C130_B110_I1_R1",
                "mushroom_red_NW#H100_C130_B110_I1_R2",
                "mushroom_red_NW#H100_C130_B110_I1_R3",
            ]})
        }
        // callback()
    },  

    do: (cityNode, callback=_ => {}, param={}) => {
        SUBSTEP_BuildingHouseFinal.doEnter(cityNode, callback)
    }
}



export const section_BuildBestHouse3a = {
    type:"Build", 
    title: "Auto Builder: House 3a ",
    isValidated:true,
    steps: [
        SUBSTEP_BuildingHouseStarConf({buildType:'house3a', growLoopCount:10}),
        SUBSTEP_WATTING,
        SUBSTEP_BuildingHouseCheck,
        stepNoWai, 
        SUBSTEP_BuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}
export const section_BuildBestHouse3b = {
    type:"Build", 
    title: "Auto Builder: House 3b ",
    isValidated:true,
    steps: [
        SUBSTEP_BuildingHouseStarConf({buildType:'house3b', growLoopCount:10}),
        SUBSTEP_WATTING,
        SUBSTEP_BuildingHouseCheck,
        stepNoWai, 
        SUBSTEP_BuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}
export const section_BuildBestHouse4a = {
    type:"Build", 
    title: "Auto Builder: House 4a ",
    isValidated:true,
    steps: [
        SUBSTEP_BuildingHouseStarConf({buildType:'house4a', growLoopCount:10}),
        SUBSTEP_WATTING,
        SUBSTEP_BuildingHouseCheck,
        stepNoWai, 
        SUBSTEP_BuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}

export const section_BuildBestHouse6a = {
    type:"Build", 
    title: "Auto Builder: House 6a ",
    isValidated:true,
    steps: [
        SUBSTEP_BuildingHouseStarConf({buildType:'house6a', growLoopCount:10}),
        SUBSTEP_WATTING,
        SUBSTEP_BuildingHouseCheck,
        stepNoWai, 
        SUBSTEP_BuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}


export const section_BuildBestHouse_LIST = [
    section_BuildBestHouse3a,
    section_BuildBestHouse3b,
    section_BuildBestHouse4a,
    section_BuildBestHouse6a,
]