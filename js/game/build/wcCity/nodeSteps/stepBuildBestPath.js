import { PathFactory } from "../../path.js";
import { CityRoad } from "../cityRoad.js";
import { SUBSTEP_ERROR, SUBSTEP_WATTING, abstractStep } from "./abstractStep.js";
import { CitNodeRoad } from "../config/cityNodeRoad.js";


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


const SUBSTEP_BuildingPathStart =  {...abstractStep,
    text: `> ## Path Configuration. ... `, 

    isValidated: (cityNode) => 
        !cityNode.sData,

    doEnter: (cityNode, callback=_ => {} ) => {
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        cityNode.sData = {
            isWaiting:false,
            pathConfig: PATH_CONFIG,
            param : null,
            possibleTiles: null,
            bestNode: null,
        }
        callback()
    },

}

const SUBSTEP_BuildingPathCheckPossible = {...abstractStep, 
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
const SUBSTEP_NoWai = {...abstractStep,
    text: ` > # Path can be construct ... `, 
    isValidated: (cityNode) => 
        cityNode.sData && 
        cityNode.sData.possibleTiles != null && 
        cityNode.sData.possibleTiles.length == 0,
}


const SUBSTEP_BuildingPathChoiseBest = {...abstractStep, 
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
        let bestNode = false;
        while(nodeFilterC.length) {
            bestNodeInfo = nodeFilterC.shift()
            const path = new PathFactory(cityNode.world, {})
            const wcPath = path.createWcPath({x:cityNode.x, y:cityNode.y}, {x:bestNodeInfo.node.x, y:bestNodeInfo.node.y})
            // check the length of the path
            if (wcPath.tileList.length >= config.length + 5) {
                bestNode = false
            } else {
                bestNode = true
                break
            }
        }
        console.log("bestNode", bestNodeInfo )
        if (bestNode) {
            cityNode.sData.bestNode = bestNodeInfo.node
        }
        callback()
     }
}


// Node Valide Not Exist
const SUBSTEP_NoWai2 = {...abstractStep,
    text: ` > # Path No Valide Node ... `, 
    isValidated: (cityNode) => 
        cityNode.sData && 
        cityNode.sData.bestNode == null
}



const SUBSTEP_BuildingPathFinal = {...abstractStep, 
    text: `> ### Build the path Auto `, 
    isValidated: (cityNode) => {
        console.log("ISVALIDE", cityNode, cityNode.sData.bestNode != null)
        return cityNode.sData 
        && cityNode.sData.bestNode
    },
    doEnter: (cityNode, callback=_ => {}, callend=null) => { 
        console.log("DOENTER", cityNode)
        const bestNode = cityNode.sData.bestNode
        const nCityTile = cityNode.fm.getTile(bestNode.x, bestNode.y)
        const nCityNode = nCityTile.cityNode 
            ? nCityTile.cityNode 
            : new CitNodeRoad(cityNode.world, cityNode.cityFactory, nCityTile, cityNode.conf)

        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        const path = new PathFactory(cityNode.world, {})
        const wcPath = path.createWcPath({x:cityNode.x, y:cityNode.y}, {x:nCityNode.x, y:nCityNode.y})
        
        wcPath.start().then(_ => {
            const newRoad = new CityRoad(cityNode, nCityNode, wcPath)
            cityNode.addRoad(newRoad)
            nCityNode.addRoad(newRoad)
            cityNode.homeStep()
            callend ? callend() : callback(); 
        })
        cityNode.sData.isWaiting = true
        callback(); 
    }
}

export const SUBSTEP_LIST_BuildBestPath = [
    SUBSTEP_BuildingPathStart,
    SUBSTEP_BuildingPathCheckPossible,
    SUBSTEP_NoWai,
    SUBSTEP_BuildingPathChoiseBest,
    SUBSTEP_NoWai2,
    SUBSTEP_BuildingPathFinal,
]


export const STEP_BuildBestPath = {
    title: "Auto Builder: Path",
    type:"Build", 
    isValidated:true,
    steps: [
        SUBSTEP_WATTING,
        ...SUBSTEP_LIST_BuildBestPath,
        SUBSTEP_ERROR,
    ],
}

// --------------

export const SUBSTEP_BestPathBuilder_Build = {...abstractStep, 
    text: `> ### Build the path `,
    isValidated: (cityNode) => !cityNode.sData,
    
    doEnter: (cityNode, callback=_ => {}, callend=_ => {}) => {

        const fFinal = _ => {
            if (SUBSTEP_BuildingPathFinal.isValidated(cityNode)) {
                SUBSTEP_BuildingPathFinal.doEnter(cityNode, callback, callend)
            }
        }
        const fError = _ => {
            cityNode.homeStep()
            callend(); 
        }
        const fChoiseBest = _ => {
            if (SUBSTEP_BuildingPathChoiseBest.isValidated(cityNode)) {
                SUBSTEP_BuildingPathChoiseBest.doEnter(cityNode, fFinal)
            } else {
                fError()
            }
        }
        
        const fCheckPossible = _ => {
            if (SUBSTEP_BuildingPathCheckPossible.isValidated(cityNode)) {
                SUBSTEP_BuildingPathCheckPossible.doEnter(cityNode, fChoiseBest)
            } else {
                fError()
            }
        }
        const fCheckPathStart = _ => {
            if (SUBSTEP_BuildingPathStart.isValidated(cityNode)) {
                SUBSTEP_BuildingPathStart.doEnter(cityNode, fCheckPossible)
            } else {
                fError()
            }
        }
        fCheckPathStart()
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
    do: (cityNode, callback=_ => {}, param={}) => { 
        const bestNode = cityNode.sData.bestNode
        const nCityTile = cityNode.fm.getTile(bestNode.x, bestNode.y)
        const nCityNode = nCityTile.cityNode ? nCityTile.cityNode : new CitNodeRoad(cityNode.world, cityNode.cityFactory, nCityTile, cityNode.conf)

        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        const path = new PathFactory(cityNode.world, {})
        const wcPath = path.createWcPath({x:cityNode.x, y:cityNode.y}, {x:nCityNode.x, y:nCityNode.y})
        wcPath.start().then(_ => {
            const newRoad = new CityRoad(cityNode, nCityNode, wcPath)
            cityNode.addRoad(newRoad)
            nCityNode.addRoad(newRoad)
            cityNode.homeStep()
            callback(); 
        })
        cityNode.sData.isWaiting = true
        callback(); 
    }
}


