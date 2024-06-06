import { WcBuildingFactory2 } from "../../wcBuilding2/wcBuildingFactory.js"
import { CitNodeGrave } from "../config/cityNodeGrave.js"
import { CitNodeHouse } from "../config/cityNodeHouse.js"
import { CitNodeLab } from "../config/cityNodeLab.js"
import { SUBSTEP_ERROR, SUBSTEP_WATTING, abstractStep } from "./abstractStep.js"



const stepBuildingHouseStarConf = (bType, gCount) => {return {...abstractStep,
    text: `> ## House Configuration. ... `, 

    isValidated: (cityNode) => !cityNode.sData,

    doEnter: (cityNode, callback=_ => {} ) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        cityNode.sData = {
            isWaiting:false,
            param : {
                buildType:bType,
                growLoopCount:gCount,
            },
            possibleTiles: null,
            selectedTile: null,
        }
        callback()
    },
}}


const stepBuildingHouseCheck =  {...abstractStep,
    text: `> ## Check the configuration ... `, 

    isValidated: (cityNode) => cityNode.sData && cityNode.sData.param && cityNode.sData.possibleTiles == null,
 
    doEnter: (cityNode, callback=_ => {}) => { 
        // Check for all Possible Tile To build a House around the node

        cityNode.sData.possibleTiles = []
        cityNode.sData.selectedTile = null

        const allTileAround = []
        const isValid = (tile) => (!tile.wcBuild)

        // loop on city node road
        cityNode.roads.forEach(road => {
            console.log('road', road)
            // foreach tile of the road
            road.wcPath.tileList.forEach(roadTile => {
                // look to tile around the path 
                const nearRoadTile = [...roadTile.nearTilesAxe(3), ...roadTile.nearTilesAxe(4)];
                nearRoadTile.forEach(nTile => {
                    if (allTileAround.includes(nTile)) return ;
                    allTileAround.push(nTile)
                    if (
                        isValid(nTile) 
                        && nTile.nearTiles.filter(t => isValid(t)).length == 4
                        && nTile.nearCrossTiles.filter(t => isValid(t)).length == 4
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
        const building = new WcBuildingFactory2(cityNode.world, cityNode.sData.param)// HOUSE_CONFIGURATION)

        while (!validBuild && sortedPosibleTile.length != 0) {
            let n = sortedPosibleTile.shift().tile
            validBuild = building.test(n.x, n.y)
            console.log("validBuild", n.x, n.y, validBuild)
            if (!validBuild) {
                cityNode.sData.possibleTiles = cityNode.sData.possibleTiles.filter(t => t != n)
            } else {
                cityNode.sData.selectedTile = n
            }
        }

        /*
        cityNode.GS.set("TileClickFunction", { 
            func:'doFunction', do: (x, y) => {
                const select = cityNode.sData.possibleTiles.filter(n => n.x == x && n.y == y)

                if (select.length) {
                    const n = select[0]
                    console.log("selectNearNode", n)
                    cityNode.sData.selectedTile = n
                    cityNode.ta.doAction({func:'clearAllTemporatyItems'})
                    cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:this.asset.key})
                    this.GS.set("TileClickFunction", null)
                } else {
                    console.log("bad_selection")
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
const stepNoWai = {...abstractStep,
    text: ` > # House can be construct ... `, 
    isValidated: (cityNode) => cityNode.sData && cityNode.sData.possibleTiles &&  cityNode.sData.possibleTiles.length == 0,
}



// Node Is Selected Ready to be Build 
const stepBuildingHouseFinal = {...abstractStep,
    text: ` > Build the house Auto`, 
    isValidated: (cityNode) =>  cityNode.sData && cityNode.sData.selectedTile != null,

    doEnter: (cityNode, callback=_ => {}, callend=null) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        // console.log("param", param)
        // const HOUSE_CONFIGURATION = new WcBuildConf_House3b({growLoopCount:5})
        // const HOUSE_CONFIGURATION = new WcBuildConf_House4a({growLoopCount:5})
        const building = new WcBuildingFactory2(cityNode.world, cityNode.sData.param)// HOUSE_CONFIGURATION)
        const n = cityNode.sData.selectedTile
        building.start(n.x, n.y).then(_ => {
            const param = cityNode.sData.param
            const cityNodeHouse = n.cityNode ? n.cityNode 
                : param.buildType == 'house3b' ? new CitNodeHouse(cityNode.world, cityNode.cityFactory, n)
                : param.buildType == 'house4a' ? new CitNodeLab(cityNode.world, cityNode.cityFactory, n)
                : param.buildType == 'house6a' ? new CitNodeGrave(cityNode.world, cityNode.cityFactory, n)
                :  new CitNodeHouse(cityNode.world, cityNode.cityFactory, n)
            cityNodeHouse.buildFactory = building;
            cityNode.sData = null
            cityNode.homeStep()
            callend ? callend() : callback(); 
        })
        console.log('DO WAITING')
        cityNode.sData.isWaiting = true
        callback()
    }
}


export const CREATE_SUBSTEP_BUILD = (btype, gCount) => {return {...abstractStep, 
    text: `> ### Build the path `,
    isValidated: (cityNode) => true,
    
    doEnter: (cityNode, callback=_ => {}, callend=_ => {}) => {
        const fError = _ => {
            cityNode.homeStep()
            callend(); 
        }
        const fFinal = _ => {
            if (stepBuildingHouseFinal.isValidated(cityNode)) {
                stepBuildingHouseFinal.doEnter(cityNode, callback, callend)
            } else {
                fError()
            }
        }

        const fChoiseBest = _ => {
            if (stepBuildingHouseCheck.isValidated(cityNode)) {
                stepBuildingHouseCheck.doEnter(cityNode, fFinal)
            } else {
                fError()
            }
        }
        const fCheckPathStart = _ => {
            const startStep = stepBuildingHouseStarConf(btype, gCount)
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



const stepBuildingHouseStart =  {...abstractStep,
    text: `> ## House Configuration. ... `, 
    doParamShema : {'toto':1},

    isValidated: (cityNode) => !cityNode.sData,

    doEnter: (cityNode, callback=_ => {} ) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        cityNode.sData = {
            isWaiting:false,
            param : null,
            possibleTiles: null,
            selectedTile: null,
        }
    },

    doParamShema : {
        schema: {
            // "title": "Person",
            type: "object",
            required: [
                "buildType", "growLoopCount",
              ],
            properties: {
                "buildType": {
                    title: "Building Type",
                    type: "string",
                    enum: [
                        "house3a",
                        "house3b",
                        "house4a",
                        "house6a",
                        // "Big Lab",
                    ]
                },    
                "growLoopCount": {
                    title:"Building Size",
                    type: "integer",
                    enum: [
                       1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
                      ],
                    default: 10,
                    minimum: 1,
                    maximum: 100
                  },

            }
          }
    },

    do: (cityNode, callback=_ => {}, param={}) => {
        console.log("param", param)
        cityNode.sData.param = param
        callback()
    },

}




// Node Is Selected Ready to be Build 
const stepBuildingHouseFinalCheck = {...abstractStep,
    text: ` > Build the house `, 
    isValidated: (cityNode) =>  stepBuildingHouseFinal.isValidate(cityNode),

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
        stepBuildingHouseFinal.doEnter(cityNode, callback)
    }
}




export const section_BuildBestHouse = {
    type:"Build", 
    title: "Builder: House",
    isValidated:true,
    steps: [
        SUBSTEP_WATTING,
        stepBuildingHouseStart,
        stepBuildingHouseCheck,
        stepNoWai, 
        stepBuildingHouseFinalCheck,
        SUBSTEP_ERROR
    ] 
}

export const section_BuildBestHouse3a = {
    type:"Build", 
    title: "Auto Builder: House 3a ",
    isValidated:true,
    steps: [
        stepBuildingHouseStarConf('house3a', 30),
        SUBSTEP_WATTING,
        stepBuildingHouseCheck,
        stepNoWai, 
        stepBuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}
export const section_BuildBestHouse3b = {
    type:"Build", 
    title: "Auto Builder: House 3b ",
    isValidated:true,
    steps: [
        stepBuildingHouseStarConf('house3b', 10),
        SUBSTEP_WATTING,
        stepBuildingHouseCheck,
        stepNoWai, 
        stepBuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}
export const section_BuildBestHouse4a = {
    type:"Build", 
    title: "Auto Builder: House 4a ",
    isValidated:true,
    steps: [
        stepBuildingHouseStarConf('house4a', 10),
        SUBSTEP_WATTING,
        stepBuildingHouseCheck,
        stepNoWai, 
        stepBuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}

export const section_BuildBestHouse6a = {
    type:"Build", 
    title: "Auto Builder: House 6a ",
    isValidated:true,
    steps: [
        stepBuildingHouseStarConf('house6a', 10),
        SUBSTEP_WATTING,
        stepBuildingHouseCheck,
        stepNoWai, 
        stepBuildingHouseFinal,
        SUBSTEP_ERROR
    ] 
}





export const section_BuildBestHouse_LIST = [
    section_BuildBestHouse3a,
    section_BuildBestHouse3b,
    section_BuildBestHouse4a,
    section_BuildBestHouse6a,
]