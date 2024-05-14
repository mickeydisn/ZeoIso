import { WcBuildConf_House3a } from "../../wcBuilding2/buildConf_house3a.js"
import { WcBuildingFactory, WcBuildingFactory2 } from "../../wcBuilding2/wcBuildingFactory.js"
import { CitNodeHouse } from "../cityTileNode.js"
import { STEP_ERROR, abstractStep } from "./abstractStep.js"



const PATH_CONFIG = {
    length: 4,
    minDist: 3,
    crossDist: null,
    alphaStep : 8,

    lvlDeviationCount: 4,
    lvlDefviationAlpha: 2,  
    asset: {key: [
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R1",
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R2",
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R3",
        "statue_obelisk_NW#_H180_C150_S95_B75_I1_R2",
    ]},
}

const stepWaiting = {...abstractStep, 
    title: "House Builder",
    text: `> ### ...Waiting To Build `, 
    isValidated : (cityNode) =>  {
        return cityNode.sData && cityNode.sData.isWaiting
    },
}



const stepBuildingHouseStartHouse3b =  {...abstractStep,
    title: "House Builder",
    text: `> ## House Configuration. ... `, 

    isValidated: (cityNode) => !cityNode.sData,

    doEnter: (cityNode, callback=_ => {} ) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        cityNode.sData = {
            isWaiting:false,
            param : {
                buildType:"house3b",
                growLoopCount:20,
            },
            possibleTiles: null,
            selectedTile: null,
        }
        callback()
    },
}

const stepBuildingHouseStart =  {...abstractStep,
    title: "House Builder",
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

    doParamShema : {'toto':1},

    do: (cityNode, param={}, callback=_ => {}) => {
        console.log("param", param)
        cityNode.sData.param = param
        callback()
    },

}

const stepBuildingHouseCheck =  {...abstractStep,
    title: "House Builder",
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
const stepNoWai ={...abstractStep,
    title: "House Builder",
    text: ` > # House can be construct ... `, 
    isValidated: (cityNode) => cityNode.sData && cityNode.sData.possibleTiles &&  cityNode.sData.possibleTiles.length == 0,
}



// Node Is Selected Ready to be Build 
const stepBuildingHouseFinal = {...abstractStep,
    title: "House Builder",
    text: ` > Build the house Auto`, 
    isValidated: (cityNode) =>  cityNode.sData && cityNode.sData.selectedTile != null,

    doEnter: (cityNode, callback=_ => {}) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        // console.log("param", param)
        // const HOUSE_CONFIGURATION = new WcBuildConf_House3b({growLoopCount:5})
        // const HOUSE_CONFIGURATION = new WcBuildConf_House4a({growLoopCount:5})
        const building = new WcBuildingFactory2(cityNode.world, cityNode.sData.param)// HOUSE_CONFIGURATION)
        const n = cityNode.sData.selectedTile
        building.start(n.x, n.y).then(_ => {
            cityNode.sData = null

            const cityNodeHouse = n.cityNode ? n.cityNode : new CitNodeHouse(cityNode.world, n)
            cityNodeHouse.buildFactory = building;
            cityNode.homeStep()
            callback()
        })
        console.log('DO WAITING')
        cityNode.sData.isWaiting = true
        callback()
    }
}

// Node Is Selected Ready to be Build 
const stepBuildingHouseFinalCheck = {...abstractStep,
    title: "House Builder",
    text: ` > Build the house `, 
    isValidated: (cityNode) =>  cityNode.sData && cityNode.sData.selectedTile != null,

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

    do: (cityNode, param={}, callback=_ => {}) => {
        stepBuildingHouseFinal.doEnter(cityNode, callback)
    }
}


export const section_BuildBestHouse = {
    type:"Build", 
    title: "House Builder",
    isValidated:true,
    steps: [
        stepWaiting,
        stepBuildingHouseStart,
        stepBuildingHouseCheck,
        stepNoWai, 
        stepBuildingHouseFinalCheck,
        STEP_ERROR
    ] 
}

export const section_BuildBestHouse3b = {
    type:"Build", 
    title: "House 3B Builder",
    isValidated:true,
    steps: [
        stepWaiting,
        stepBuildingHouseStartHouse3b,
        stepBuildingHouseCheck,
        stepNoWai, 
        stepBuildingHouseFinal,
        STEP_ERROR
    ] 
}
