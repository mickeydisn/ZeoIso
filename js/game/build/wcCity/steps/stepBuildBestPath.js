import { PathFactory } from "../../path.js";
import { CityRoad } from "../cityRoad.js";
import { CityTileNode } from "../cityTileNode.js";
import { STEP_ERROR, abstractStep } from "./abstractStep.js";


const PATH_CONFIG = {
    /*
    length: 12,
    minDist: 10,
    crossDist: 16,

    alphaStep : 10,
    */

    length: 15,
    minDist: 13,
    crossDist: 20,
    alphaStep : 20,

    lvlDeviationCount: 4,
    lvlDefviationAlpha: 2,  
    asset: {key: [
        "statue_obelisk_NW#H120_C150_S95_B75_I1_R1",
        "statue_obelisk_NW#H120_C150_S95_B75_I1_R2",
        "statue_obelisk_NW#H120_C150_S95_B75_I1_R3",
        "statue_obelisk_NW#H120_C150_S95_B75_I1_R2",
    ]},
    crossAsset: {key: [
        "statue_obelisk_NW#H20_C150_S95_B75_R1",
        "statue_obelisk_NW#H20_C150_S95_B75_R2",
        "statue_obelisk_NW#H20_C150_S95_B75_R3",
        "statue_obelisk_NW#H20_C150_S95_B75_R2",
    ]},
}

const stepWaiting = {...abstractStep, 
    text: `> ### Waiting path to build `, 
    isValidated : (cityNode) =>  {
        return cityNode.sData && cityNode.sData.isWaiting
    },
}


const stepBuildingPathStart =  {...abstractStep,
    text: `> ## Path Configuration. ... `, 

    isValidated: (cityNode) => !cityNode.sData,

    doEnter: (cityNode, callback=_ => {} ) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        cityNode.sData = {
            isWaiting:false,
            pathConfig: PATH_CONFIG,
            param : null,
            possibleTiles: null,
            selectedTile: null,
        }
        callback()
    },

}

export const stepBuildingPathCheckPossible_old = {...abstractStep, 
    text: `> ### Build the path Auto `, 
    isValidated: (cityNode) => cityNode.sData &&  !cityNode.sData.isChecked,
    doEnter: (cityNode, callback=_ => {}) => { 
        const bestNearNodeInfo = cityNode.getBestNearNode(PATH_CONFIG)
        cityNode.sData.bestNode = bestNearNodeInfo ? bestNearNodeInfo.node : null
        cityNode.sData.isChecked = true
        callback(); 
    }
}


export const stepBuildingPathCheckPossible = {...abstractStep, 
    text: `> ### Select All possible node for a path  `, 
    isValidated: (cityNode) => 
        cityNode.sData &&  
        cityNode.sData.possibleTiles == null,
    doEnter: (cityNode, callback=_ => {}) => { 
        const NEAR_ITER_LIMIT=2
        const ITER_LIMIT=40
        const CROSS_ITER_MIN=3

        const config = cityNode.sData.pathConfig

        const nodeGraph = cityNode.getNodeGraphFrom(ITER_LIMIT) 
        // Get Direct Connected Node    
        if (config.crossDist) {
            const connectedRoad = cityNode.getNodeConnected(0)   
            // Check for Cross Node : 
            const filterCross = cityNode.nodeGraphDistance(nodeGraph)
                .filter(nG => {
                    return nG.p >= CROSS_ITER_MIN && nG.distance <= config.crossDist
                })
            if (filterCross.length) {
                const crossTileList =  filterCross.sort((a, b) => (a.distance - b.distance))
                cityNode.sData.possibleTiles = crossTileList
                callback()
                return crossTileList
            }
        }

        // Get node Arround with configuration . 
        const nodeAroundRaw = cityNode.getNodesAround(config.length, config.alphaStep)
        const nodeAroundValide = nodeAroundRaw
            .filter(n => cityNode._isValideNearNode(n))

        console.log("nodeAroundValide", nodeAroundValide)

        if (nodeAroundValide.length == 0) {
            callback();
            return null;
        }

        const nodeAroundInfo = nodeAroundValide
            .map(n => {
                const distNodeGraph = n.nodeGraphDistance(nodeGraph)
                return {
                    node:n,
                    minDist: distNodeGraph[0].distance,
                    avgNearDist: distNodeGraph
                        .filter(nG => nG.p < NEAR_ITER_LIMIT)
                        .reduce((acc, a) => acc + a.distance, 0),
                    avgFareDist: distNodeGraph
                        .filter(nG => nG.p >= NEAR_ITER_LIMIT)
                        .reduce((acc, a) => acc + a.distance, 0),
                }
            })

        // Filter To close to other Path
        const nodeFilterA = nodeAroundInfo
            .filter(nInfo => nInfo.minDist > config.minDist)
        
        console.log("nodeFilterA", nodeFilterA)
        cityNode.sData.possibleTiles = nodeFilterA
        callback(); 
    },
}


// Node Valide Not Exist
const stepNoWai = {...abstractStep,
    text: ` > # Path can be construct ... `, 
    isValidated: (cityNode) => 
        cityNode.sData && 
        cityNode.sData.possibleTiles != null && 
        cityNode.sData.possibleTiles.length == 0,
}


export const stepBuildingPathChoiseBest = {...abstractStep, 
    text: `> ### Chose the best   `, 
    isValidated: (cityNode) =>
        cityNode.sData && 
        cityNode.sData.possibleTiles != null && 
        cityNode.sData.possibleTiles.length != 0 && 
        cityNode.sData.bestNode == null,
    doEnter: (cityNode, callback=_ => {}) => {

        const config = cityNode.sData.pathConfig

       // Filter half of node with greatess distance of  avgNearDist
       const nodeFilterB = cityNode.sData.possibleTiles
            .sort((a, b) => b.avgNearDist - a.avgNearDist)
            .slice(0, Math.min(cityNode.sData.possibleTiles.length , 3))

        // Filter node with the less distance of avgFareDist
        const nodeFilterC = nodeFilterB
            .sort((a, b) => (a.avgFareDist - b.avgFareDist) || b.avgNearDist - a.avgNearDist)

        // Use pathfinder to check the true path lenght ( filter > conf.length + 5)
        let bestNodeInfo = false
        while(nodeFilterC.length) {
            bestNodeInfo = nodeFilterC.shift()
            const path = new PathFactory(cityNode.world, {})
            const wcPath = path.createWcPath({x:cityNode.x, y:cityNode.y}, {x:bestNodeInfo.node.x, y:bestNodeInfo.node.y})
            // check the length of the path
            if (wcPath.tileList.length >= config.length + 5) {
                bestNode = false
            } else {
                break
            }
        }
        console.log("bestNode", bestNodeInfo )
        cityNode.sData.bestNode = bestNodeInfo.node
        callback()
     }
}


// Node Valide Not Exist
const stepNoWai2 = {...abstractStep,
    text: ` > # Path No Valide Node ... `, 
    isValidated: (cityNode) => 
        cityNode.sData && 
        cityNode.sData.bestNode === false
}



export const stepBuildingPathFinal = {...abstractStep, 
    text: `> ### Build the path Auto `, 
    isValidated: (cityNode) => 
        cityNode.sData && 
        cityNode.sData.bestNode,

    doEnter: (cityNode, callback=_ => {}) => { 
        const bestNode = cityNode.sData.bestNode
        const nCityTile = cityNode.fm.getTile(bestNode.x, bestNode.y)
        const nCityTileNode = nCityTile.cityNode ? nCityTile.cityNode : new CityTileNode(cityNode.world, nCityTile, cityNode.conf)

        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        const path = new PathFactory(cityNode.world, {})
        const wcPath = path.createWcPath({x:cityNode.x, y:cityNode.y}, {x:nCityTileNode.x, y:nCityTileNode.y})
        wcPath.start().then(_ => {
            const newRoad = new CityRoad(cityNode, nCityTileNode, wcPath)
            cityNode.addRoad(newRoad)
            nCityTileNode.addRoad(newRoad)
            cityNode.homeStep()
            callback(); 
        })
        cityNode.sData.isWaiting = true
        callback(); 
    }
}


// Node Is Selected Ready to be Build 
const stepBuildingPathFinalCheck = {...abstractStep,
    text: ` > Build the Path Check `, 
    isValidated: (cityNode) =>  stepBuildingPathFinal.isValidate(cityNode),

    doEnter: (cityNode, callback=_ => {}) => { 
        if (cityNode.sData && cityNode.sData.bestNode) {
            const n = cityNode.sData.bestNode
            cityNode.ta.doAction({func:'clearAllTemporatyItems'})
            cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:"statue_obelisk_NW#_C130_B110_I1_R3"})
        } else {
            console.log('Not a Valide Path')
        }
    },  

    do: (cityNode, param={}, callback=_ => {}) => {
        if (stepBuildingPathFinal.isValidate(cityNode)) {

        }
        stepBuildingPathFinal.doEnter(cityNode, callback)
    }
}


export const section_BuildBestPath = {
    title: "Auto Builder: Path",
    type:"Build", 
    isValidated:true,
    steps: [
        stepWaiting,
        stepBuildingPathStart,
        stepBuildingPathCheckPossible,
        stepNoWai,
        stepBuildingPathChoiseBest,
        stepNoWai2,
        stepBuildingPathFinal,
        STEP_ERROR,
    ],
}

// --------------


const stepNoPath = {...abstractStep, 
    text: `> ### No path to build `, 
    isValidated: (cityNode) => {
        return cityNode.sData && cityNode.sData.bestNode == null
    }
}


export const stepBestPathBuilder_Build = {...abstractStep, 
    text: `> ### Build the path `, 
    isValidated: (cityNode) => {
        const bestNearNode = cityNode.getBestNearNode(PATH_CONFIG)
        cityNode.sData = {
            bestNode: bestNearNode ? bestNearNode.node : null
        }
        return bestNearNode != null
    },
    doEnter: (cityNode, callback=_ => {}) => { 
        if (cityNode.sData && cityNode.sData.bestNode) {
            const n = cityNode.sData.bestNode
            cityNode.ta.doAction({func:'clearAllTemporatyItems'})
            cityNode.ta.doAction({func:'temporatyItemsForceKey', x:n.x, y:n.y, assetKey:"statue_obelisk_NW#_C130_B110_I1_R3"})
        } else {
            console.log('Not a Valide Path')
        }
        // callback()
    },
    undo:(cityNode, callback=_ => {}) => { 
        cityNode.sData = null,
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        callback(); 
    },
    do: (cityNode, param={}, callback=_ => {}) => { 
        const bestNode = cityNode.sData.bestNode
        const nCityTile = cityNode.fm.getTile(bestNode.x, bestNode.y)
        const nCityTileNode = nCityTile.cityNode ? nCityTile.cityNode : new CityTileNode(cityNode.world, nCityTile, cityNode.conf)

        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        const path = new PathFactory(cityNode.world, {})
        const wcPath = path.createWcPath({x:cityNode.x, y:cityNode.y}, {x:nCityTileNode.x, y:nCityTileNode.y})
        wcPath.start().then(_ => {
            const newRoad = new CityRoad(cityNode, nCityTileNode, wcPath)
            cityNode.addRoad(newRoad)
            nCityTileNode.addRoad(newRoad)
            cityNode.homeStep()
            callback(); 
        })
        cityNode.sData.isWaiting = true
        callback(); 
    }
}


export const section_BuildBestPath_old = {
    title: "Path Builder",
    type:"Build", 
    isValidated:true,
    steps: [
        stepWaiting,
        stepBuildingPathFinalCheck,
        stepNoPath,
        STEP_ERROR,
    ],
}
