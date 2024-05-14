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
    title: "Path Builder",
    text: `> ### Waiting path to build `, 
    isValidated : (cityNode) =>  {
        return cityNode.sData && cityNode.sData.isWaiting
    },
}


const stepNoPath = {...abstractStep, 
    title: "Path Builder",
    text: `> ### No path to build `, 
    isValidated: (cityNode) => {
        return cityNode.sData && cityNode.sData.bestNode == null
    }
}


export const stepBestPathBuilder_Build = {...abstractStep, 
    title: "Path Builder",
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
            cityNode.sData = null,
            callback(); 
        })
        cityNode.sData.isWaiting = true
        callback(); 
    }
}


export const section_BuildBestPath = {
    type:"Build", 
    title: "Path Builder",
    isValidated:true,
    steps: [
        stepWaiting,
        stepBestPathBuilder_Build,
        stepNoPath,
        STEP_ERROR,
    ],
}

