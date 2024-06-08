
import { CityTileNode } from "../cityTileNode.js"
import { def_STEP_TEXT } from "./defaultCity.js"



const STEP_ASSIGN_LAB = def_STEP_TEXT({
    title: "Assigne the LAB",
    text:  `
> - Once assigned, a ghost withou a lab will take up residence in the lab. 
> - To take a lab a ghost need to have an grave and a house 
> - Thanks to the lab, the ghost will be able to gain other types of memory. 
    `, 
    doText: "Assigne the LAB .",
    isValidated:(cityNode) => true  
        && cityNode.entities.length === 0 
        && cityNode.cityFactory.entities
            .filter(e => e.cityLink.house != null)
            .filter(e => e.cityLink.lab === null).length != 0,
        
    doClick:(cityNode) => {
        const homeless = cityNode.cityFactory.entities
            .filter(e => e.cityLink.house != null)
            .filter(e => e.cityLink.lab === null)
        if (homeless.length > 0) {
            homeless[0].defineCityNodeLink('lab', cityNode)
        }
    }
})



const STEP_ENTITIE_CALL_BACK = def_STEP_TEXT({
    title:" => Call the ghost ",
    text:`
 > - This action stop all ghost wandering
 > - When ghosts is on the lab, you can give him some order.
    `,
    isValidated:(cityNode) => cityNode.player.storyProgress.INTRO.IS_SUMMON
        && cityNode.entities.length > 0 
        && !cityNode.entitiesIsAtNode,

    doText: "Brings back the ghost to the lab !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {id:'goLab', waitCount:0, count:1},
                {id:'goLab', waitCount:20 * 20, count:null},
            ]
        });
    }
})


const STEP_ENTITIE_FIRST_LAB_LOOP = def_STEP_TEXT({
    title:" => Wandering Lab Memory Loop",
    text:`
> After returning to its grave : 
> - The ghost store 10 MEMORY_LAB   
> - The ghost begins to wander again
`,

    isValidated:(cityNode) => !cityNode.player.storyProgress.INTRO.STEP_ENTITIE_FIRST_LAB_LOOP
        && cityNode.entitiesIsAtNode,

    doText: "Start a MEMORY_LAB Wandering !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {count:1,    waitCount:0,  id:'goGrave'},
                {count:1,    waitCount:20 * 2,  id:'goHouse'},
                {count:null,    waitCount:20 * 2,  id:'goLab'},
                {count:1,    waitCount:0,       id:'inventoryAdd', 
                    sData:{cityLink: 'lab', itemId:'MEMORY_LAB', count:10}},
            ]
            cityNode.player.storyProgress.STEP_ENTITIE_FIRST_LAB_LOOP = true
        });
    }
})

const STEP_ENTITIE_LAB_LOOP = def_STEP_TEXT({
    title:" => Wandering Lab Memory Loop",
    text:`
> After returning to its grave : 
> - The ghost store 1 MEMORY_LAB   
> - The ghost begins to wander again
`,

    isValidated:(cityNode) => cityNode.player.storyProgress.INTRO.STEP_ENTITIE_FIRST_LAB_LOOP
        && cityNode.entitiesIsAtNode,

    doText: "Start a MEMORY_LAB Wandering !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {count:1,    waitCount:0,  id:'goGrave'},
                {count:null,    waitCount:20 * 2,  id:'goHouse'},
                {count:null,    waitCount:20 * 2,  id:'goLab'},
                {count:null,    waitCount:0,       id:'inventoryAdd', 
                    sData:{cityLink: 'lab', itemId:'MEMORY_LAB', count:1}},
                {count:null,    waitCount:20 * 2,  id:'goGrave'},
            ]
        });
    }
})
// -----------------




export class CitNodeLab extends CityTileNode {
    constructor(world, cityFactory, tile, conf={}) {
        super(world, cityFactory, tile, {...conf, type:'LabNode'})
        this.asset = {key: [
            "coinGold_NW#_H90_C110_S80_B80_R1",
            "coinGold_NW#_H90_C110_S80_B80_R1",
            "coinGold_NW#_H90_C110_S80_B80_R2",
            "coinGold_NW#_H90_C110_S80_B80_R2",
        ]}
        this.STEPS = [

            {
                type: "Menu",
                title: "Menu",
                isValidated: true,
            },
            STEP_ASSIGN_LAB,
            {
                type:"Entities",
                title: " # Entities",
                isValidated: (cityNode) => cityNode.entities.length > 0,
            },

            STEP_ENTITIE_CALL_BACK,
            STEP_ENTITIE_FIRST_LAB_LOOP,
            STEP_ENTITIE_LAB_LOOP,

            {
                type:"Inventory",
                title: " # === Inventory ===",
                isValidated: (cityNode) => true,
            },
            
        ]

    }
}
