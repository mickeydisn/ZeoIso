
import { CityTileNode } from "../cityTileNode.js"
import { CREATE_SUBSTEP_BUILD } from "../nodeSteps/stepBuildBestHouse.js"
import { SUBSTEP_BestPathBuilder_Build } from "../nodeSteps/stepBuildBestPath.js"
import { def_STEP_TEXT } from "./defaultCity.js"



const STEP_BUILD_ROAD = def_STEP_TEXT({
    // cost: [{itemId:'rsMemoryNote', count:5}],
    cost: [],
    title: " => Build a Road",
    text: ``, 
    
    isValidated:(cityNode) => cityNode.player.storyProgress.INTRO.SPELL,
    doText: "Let's Do it !!",
    doCall:(cityNode, callback=_ => {}) => {
        SUBSTEP_BestPathBuilder_Build.doEnter(cityNode, callback, _ => { 
            callback()
        })
    }
})


const STEP_BUILD_HOUSE = def_STEP_TEXT({
    //cost: [
    //    {itemId:'rsMemoryNote', count:10},
    //],
    cost: [],
    
    title: " => Build a House", 
    text:  ``, 

    isValidated:(cityNode) => cityNode.player.storyProgress.INTRO.SPELL,
        
    doText: "Let's Do it",
    doCall:(cityNode, callback=_ => {}) => {
        CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10}).doEnter(cityNode, callback, _ => { 
            callback()
        })
    }
})

const STEP_BUILD_LAB = def_STEP_TEXT({
    // cost: [
    //     {itemId:'MEMORY_HOUSE', count:10},
    // ],
    cost: [],


    title: " => Build a Lab", 
    text:  ``, 

    isValidated:(cityNode) => cityNode.player.storyProgress.INTRO.SPELL,
        
    doText: "Let's Do it",
    doCall:(cityNode, callback=_ => {}) => {
        CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10}).doEnter(cityNode, callback, _ => { 
            callback()
        })
    }
})


export class CityNodeRoad extends CityTileNode {
    constructor(world, cityFactory, tile, conf={}) {
        super(world, cityFactory, tile, {...conf, type:'RoadNode'})
        this.asset = {key: [10, 10, 10, 10, 10, 10, 9, 8, 7].map(x => "statue_obelisk_NW#_H180_C150_S95_B75_I1_R" + x)}
        this.STEPS = [
            {
                type: "Menu",
                title: "Menu",
                isValidated: true,
            },
            STEP_BUILD_ROAD,
            STEP_BUILD_HOUSE,
            STEP_BUILD_LAB,
            /*
            STEP_BuildBestPath,
            section_BuildGraphPath,
            // section_BuildHouse,
            */
        ]
    }
}

