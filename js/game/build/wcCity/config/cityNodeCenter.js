import { CityTileNode } from "../cityTileNode.js"
import { CREATE_SUBSTEP_BUILD } from "../nodeSteps/stepBuildBestHouse.js"
import { SUBSTEP_BestPathBuilder_Build } from "../nodeSteps/stepBuildBestPath.js"
import { SUBSTEP_TEXT } from "../nodeSteps/stepStartNode.js"
import { SUBSTEP_SummonEntity } from "../nodeSteps/stepSummonEntity.js"
import { cityNode_do_Steps, def_STEP_TEXT } from "./defaultCity.js"

// ------------


const STEP_INTRO_START = def_STEP_TEXT({
    title: " => Finding the grave ",
    text: `
> - It looks like a very ancient civilization left this planet.. 
> - You've found an old Grave. 
    `, 

    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO
        && !cityNode.player.storyProgress.INTRO.IS_START,

    doText: "Inspect the grave...",
    doClick:(cityNode) => {
        cityNode.player.storyProgress.INTRO.IS_START = true
    }
})



const STEP_INTRO_SUMMON = def_STEP_TEXT({
    title: " => Wake of the Dead",
    text:  SUBSTEP_TEXT.TEXT_INTRO + `    
> - A ghost can be spawned on a grave ! 
> - When a ghost wakes up, He starts wandering!
`, 

    isValidated:(cityNode) => // true, 
        cityNode.player.storyProgress.INTRO.IS_START
        && !cityNode.player.storyProgress.INTRO.IS_SUMMON
        && cityNode.entities.length == 0,

    doText: "Raise the ghost!",
    doClick:(cityNode) => {
        SUBSTEP_SummonEntity.doEnter(cityNode)
        cityNode.player.storyProgress.INTRO.IS_SUMMON = true

    }
})


const STEP_INTRO_ENTITIE_CALL_BACK = def_STEP_TEXT({
    title:" => Call the ghost ",
    text:`
 > - This action stop all ghost wandering
 > - When ghosts is on the grave, you can give him some order.
    `,
    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.IS_SUMMON
        && cityNode.entities.length > 0
        && !cityNode.entitiesIsAtNode,

    doText: "Brings back the ghost to the grave !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {id:'goGrave', waitCount:0, count:1},
                {id:'goGrave', waitCount:20 * 60, count:null},
            ]
        });
    }
})

const STEP_INTRO_ENTITIE_FRIST_GRAVE_LOOP = def_STEP_TEXT({
    title:" => First Wandering Memory ",
    text:`    
> - When ghosts wander, it gathers MEMORY 
> - MEMORY is used to rebuild the city.
> - At the end of the wandering, the ghost returns to the grave. 
> - A ghost collects a MEMORY when it has wandered completely.
> - MEMORIES are stored in the grave. 

> After returning to its grave : 
> - The ghost store 10 rsMemoryNote   
    `,

    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.IS_SUMMON
        && !cityNode.player.storyProgress.INTRO.FRIST_LOOP
        && cityNode.entitiesIsAtNode,

    doText: "Start a rsMemoryNote Loop !",
    doClick:(cityNode) => {
        cityNode.player.storyProgress.INTRO.FRIST_LOOP_IS_STARTED = true
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {count:1,    waitCount:0,       id:'randomMove'},
                {count:1,    waitCount:20 * 2,  id:'goGrave'},
                {count:1,    waitCount:0,       id:'inventoryAdd', 
                    sData:{cityLink: 'grave', itemId:'rsMemoryNote', count:10}},
                {count:1,    waitCount:0,       id:'nodeCall', 
                    sData:{cityLink:'grave', nodeCall:(cityNode) => {
                        cityNode.player.storyProgress.INTRO.FRIST_LOOP = true
                    }}
                }, 
                {count:null, waitCount:20 * 4, id:'goGrave'},
            ]
        });
    }
})


const STEP_ENTITIE_GRAVE_LOOP = def_STEP_TEXT({
    title:" => Wandering Grave Memory Loop",
    text:`
> After returning to its grave : 
> - The ghost store 1 rsMemoryNote   
> - The ghost begins to wander again
`,

    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.IS_SUMMON
        && cityNode.player.storyProgress.INTRO.FRIST_LOOP
        && cityNode.entitiesIsAtNode,

    doText: "Start a rsMemoryNote Wandering !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {count:1,       waitCount:0,       id:'randomMove'},
                {count:null,    waitCount:20 * 2,       id:'randomMove'},
                {count:null,    waitCount:20 * 2,  id:'goGrave'},
                {count:null,    waitCount:0,       id:'inventoryAdd', 
                    sData:{cityLink: 'grave', itemId:'rsMemoryNote', count:1}},
                {count:null,    waitCount:20 * 2,       id:'randomMove'},
            ]
        });
    }
})
// -----------------



const STEP_INTRO_NODE = def_STEP_TEXT({
    title: " ?? Nodes System ",
    text: `
> #### In a Node you can: 
> - Interact with the ghost, 
> - Create a building, 
> - Manage the Node Inventory !   

> #### Inventory: 
> - You can Drop Item on the Node,
> - You can Retrive Item from the Node
> - _The player inventory is on the left of screen_
    `, 
    doText: "ok",
    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.FRIST_LOOP_IS_STARTED
        && !cityNode.player.storyProgress.INTRO.NODE,

    doClick:(cityNode) => {
        cityNode.player.storyProgress.INTRO.NODE = true
    }
})



const STEP_INTRO_FIRST_ROAD = def_STEP_TEXT({
    // cost: [{itemId:'rsMemoryNote', count:10}],

    title: " => First Road",
    text:  SUBSTEP_TEXT.TEXT_FIRST_ROAD +  `
> - Roads are key features in the city's expansion.
> - Buildings are constructed around 
> - Soon you'll discover a system for building more of them.  
    `, 
    
    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.NODE
        && !cityNode.player.storyProgress.INTRO.FIRST_ROAD 
        && cityNode.entitiesIsAtNode,

    doText: "Let's Do it !!",
    doCall:(cityNode, callback=_ => {}) => {
        // cityNode.player.storyProgress.INTRO.FIRST_ROAD_INTRO = true
        cityNode.player.storyProgress.INTRO.FIRST_ROAD = true
        SUBSTEP_BestPathBuilder_Build.doEnter(cityNode, callback, _ => { 
            // cityNode.player.storyProgress.INTRO.FIRST_ROAD = true
            callback()
        })
    }
})
// ---------------------

export const STEP_INTRO_FIRST_HOUSE = def_STEP_TEXT({
    cost: [
        {itemId:'rsMemoryNote', count:10},
    ],

    title: " => First House", 
    text:  SUBSTEP_TEXT.TEXT_FIRST_HOUSE +  `
> - The houses are a comfortable place to stay, and during their wanderings he likes to take a look around. 
> - Later, you can learn more about ghosts by visiting their homes. 
    `, 

    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.FIRST_ROAD
        && !cityNode.player.storyProgress.INTRO.FIRST_HOUSE 
        && cityNode.entitiesIsAtNode,
        
    
    doText: "Let's Do it",
    doCall:(cityNode, callback=_ => {}) => {
        cityNode.player.storyProgress.INTRO.FIRST_HOUSE = true
        CREATE_SUBSTEP_BUILD({buildType:'house3b', growLoopCount:10}).doEnter(cityNode, callback, _ => { 
            // cityNode.player.storyProgress.INTRO.FIRST_ROAD = true
            callback()
        })
    }/*
    doClick:(cityNode) => {
        cityNode.player.storyProgress.INTRO.FIRST_HOUSE_INTRO = true
    }*/
})


// ---------------------
// # cityNodeHouse.INTRO  
// ---------------------

// ------------

export const STEP_INTRO_FIRST_LAB = def_STEP_TEXT({
    cost: [{itemId:'rsMemoryNote', count:10}],

    title: " => First Lab",
    text:  SUBSTEP_TEXT.TEXT_FIRST_LAB + `
> - LABs are where ghosts work. 
> - This is where ghosts use their memories. 
> -You can create SPELLs in the LABs, used to expand the city. 
`, 
    doText: "Let's Do it !",

    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.FIRST_HOUSE 
        && !cityNode.player.storyProgress.INTRO.FIRST_LAB
        && cityNode.entitiesIsAtNode,

    doText: "Let's Do it",
    doCall:(cityNode, callback=_ => {}) => {
        cityNode.player.storyProgress.INTRO.FIRST_LAB = true
        CREATE_SUBSTEP_BUILD({buildType:'house4a', growLoopCount:10}).doEnter(cityNode, callback, _ => { 
            // cityNode.player.storyProgress.INTRO.FIRST_ROAD = true
            callback()
        })
    }
})



export const STEP_INTRO_FIRST_GRAVE = def_STEP_TEXT({
    cost: [{itemId:'rsMemoryNote', count:10}],

    title: " => First Grave",
    text:  "# SUBSTEP_TEXT.TEXT_FIRST_GRAVE" + `
> Graveyards are places where you can awaken ghosts.
> The more ghosts you have, the more memories you may have about the city. 
    `, 

    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.FIRST_LAB 
        && !cityNode.player.storyProgress.INTRO.FIRST_GRAVE
        && cityNode.entitiesIsAtNode,

    doText: "Let's Do it",
    doCall:(cityNode, callback=_ => {}) => {
        cityNode.player.storyProgress.INTRO.FIRST_GRAVE = true
        CREATE_SUBSTEP_BUILD({buildType:'house6a', growLoopCount:10}).doEnter(cityNode, callback, _ => { 
            callback()
        })
    }
})



// ------------


const STEP_INTRO_SPELL = def_STEP_TEXT({
    title: " ?? Expend the city ",
    text: `
> To expend the city , you have to use SPELL on the road-Node 
> - Create The SPELL on a LAB, 
> - Use the SPELL on a Road,
> - Expend the city.  

> #### Spell Creation : 
> - Go to a Lab, and call a ghost, 
> - Drop MEMORY into the lab, 
> - Ask to the ghost to creat a SPELL

> #### Use a Spell : 
> - Go to a Road-Node . 
> - If a spell is on the inventory , and the spell can be use on the node, the action appear on the menu. 
    `, 
    doText: "ok",
    isValidated:(cityNode) => // true,
        cityNode.player.storyProgress.INTRO.FIRST_GRAVE
        && !cityNode.player.storyProgress.INTRO.SPELL,

    doClick:(cityNode) => {
        cityNode.player.storyProgress.INTRO.SPELL = true
    }
})

// ------------


const STEP_INTRO_LOAD = def_STEP_TEXT({
    title: " => EXECUTE LOAD ",
    text: `
    `, 

    isValidated:(cityNode) => // true,
        !cityNode.player.storyProgress.INTRO.LOAD,
    
    doText: "LOAD",

    doCall:(cityNode, callback=_ => {}) => {
        cityNode.player.storyProgress.INTRO.LOAD = true
        cityNode.cityFactory.load(callback)
    }

})

// ------------



export class CitNodeCenter extends CityTileNode {
    constructor(world, cityFactory, tile, conf={}) {
        super(world, cityFactory, tile, {...conf, type:'CenterNode'})
        // type:'StartNode',
        this.asset = {key : [10, 10, 10, 10, 10, 8, 6].map(x => 'crypt_NE#_C110_S40_B90_R' + x)}
        this.STEPS = [
            {
                type: "Menu",
                title: " # Menu",
                isValidated: true,
            }, 
            // STEP_INTRO_LOAD,
            

            STEP_INTRO_START,
            STEP_INTRO_SUMMON,
            STEP_INTRO_ENTITIE_CALL_BACK,

            STEP_INTRO_ENTITIE_FRIST_GRAVE_LOOP,
            STEP_ENTITIE_GRAVE_LOOP,
            
            STEP_INTRO_NODE,

 
            STEP_INTRO_FIRST_ROAD,
            STEP_INTRO_FIRST_HOUSE,
            STEP_INTRO_FIRST_LAB,
            STEP_INTRO_FIRST_GRAVE,

            STEP_INTRO_SPELL,

        ]
    }
}

