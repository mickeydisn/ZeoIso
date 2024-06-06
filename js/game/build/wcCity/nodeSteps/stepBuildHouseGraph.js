import { SUBSTEP_ERROR, SUBSTEP_WATTING, abstractStep } from "./abstractStep.js";
import { stepBestPathBuilder_Build } from "./stepBuildBestPath.js";


const PATH_CONFIG = {
    length: 12,
    minDist: 10,
    crossDist: 16,

    alphaStep : 10,

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


const stepNoPath = {...abstractStep, 
    title: "Graph House Builder",
    text: `> ### No house to build `, 
    isValidated: (cityNode) => {
        return cityNode.sData && cityNode.sData.bestNode == null
    }
}


const stepGraphPathBuilder_Build = {...abstractStep, 
    title: "Graph House Builder",
    text: `> ### Build the house `, 
    isValidated: (cityNode) => {
        return true
    },
    doEnter: (cityNode, callback=_ => {}) => { 
        cityNode.sData = {
            isWaiting: false
        }
        //
        // callback()
    },
    do: (cityNode, callback=_ => {}, param={}) => { 

        const MAX_NODE_ROAD = 3

        const growFunction = (pIter, callIter=(pIter, call) => {}) => {
            console.log('ITERATION:', pIter)
            if (pIter <= 0) {
                callback(); 
                return
            }
            console.log('ITERATION:', pIter)

            const nodeGraphA = cityNode
                .getNodeGraphFrom(4)
            console.log("-----nodeGraphA", nodeGraphA.length, nodeGraphA.map(ng => ng.node.roads.length))

            const nodeGraph = nodeGraphA
                .filter(ng => ng.node.roads.length < MAX_NODE_ROAD)

            console.log("-----nodeGraph", nodeGraph.length, nodeGraph.map(ng => ng.node.roads.length))

            while (nodeGraph.length > 0){
                const currentNode = nodeGraph.shift().node
                const isValide = stepBestPathBuilder_Build.isValidated(currentNode)
                if (isValide) {
                    stepBestPathBuilder_Build.doEnter(currentNode)
                    stepBestPathBuilder_Build.do(currentNode, {}, _ => {
                        // cityNode.sData = null
                        if (currentNode.sData && currentNode.sData.isWaiting) {
                            console.log('IS_WATING:', pIter)
                        } else {
                            console.log('ITERATION-CALL:', pIter - 1)
                            callIter(pIter - 1, callIter); 
                        }
                    })
                    stepBestPathBuilder_Build.undo(currentNode)
                    break
                } 
                stepBestPathBuilder_Build.undo(currentNode)
            }
            return false
        }

        growFunction(20, (pIter, call) => {growFunction(pIter, call)} )
    
        cityNode.sData = { isWaiting : true }
        callback(); 
    }
}


export const section_BuildGraphPath = {
    type:"Build", 
    title: "Graph House Builder",
    isValidated:true,
    steps: [
        SUBSTEP_WATTING,
        stepGraphPathBuilder_Build,
        stepNoPath,
        SUBSTEP_ERROR,
    ],
}

