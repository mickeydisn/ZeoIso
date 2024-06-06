

import { CityTileNode } from "../cityTileNode.js"
import { def_STEP_TEXT } from "./defaultCity.js"


const STEP_ASSIGN_HOUSE = def_STEP_TEXT({
    title: "Assigne the house",
    text:  `
> - Once assigned, a homeless ghost will take up residence in the house.  
> - Thanks to the house, the ghost will be able to gain other types of memory. 
    `, 
    
    isValidated:(cityNode) => true  
        && cityNode.entities.length == 0 ,
    
    doText: " => Assigne the House .",
    doClick:(cityNode) => {
        const homeless = cityNode.cityFactory.entities.filter(e => e.cityLink.house == null)
        if (homeless.length > 0) {
            homeless[0].defineCityNodeLink('house', cityNode)
        }
        console.log('cityNode.cityFactory.entities', cityNode.cityFactory.entities)
    }
})

const STEP_ENTITIE_CALL_BACK = def_STEP_TEXT({
    title:" => Call the ghost ",
    text:`
 > - This action stop all ghost wandering
 > - When ghosts is on the house, you can give him some order.
    `,
    isValidated:(cityNode) => true
        && cityNode.entities.length > 0 
        && !cityNode.entitiesIsAtNode,

    doText: "Brings back the ghost to the house !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {id:'goHouse', waitCount:0, count:1},
                {id:'goHouse', waitCount:20 * 20, count:null},
            ]
        });
    }
})


const STEP_ENTITIE_FIRST_HOUSE_LOOP = def_STEP_TEXT({
    title:" => First Wandering House Memory ",
    text:`
> After returning to its house : 
> - The ghost store 10 MEMORY_HOUSE   
    `,

    isValidated:(cityNode) => !cityNode.player.storyProgress.INTRO.FIRST_HOUSE_LOOP
        && cityNode.entitiesIsAtNode,

    doText: "Start a MEMORY_HOUSE Wandering !",
    doClick:(cityNode) => {
        cityNode.player.storyProgress.INTRO.FIRST_HOUSE_LOOP = true
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {count:1,    waitCount:0,  id:'goGrave'},
                {count:1,    waitCount:20 * 2,  id:'goHouse'},
                {count:1,    waitCount:0,       id:'inventoryAdd', 
                    sData:{cityLink: 'house', itemId:'MEMORY_HOUSE', count:10}},
                {count:null,    waitCount:20 * 20,  id:'goHouse'},
            ]
        });
    }
})

const STEP_ENTITIE_HOUSE_LOOP = def_STEP_TEXT({
    title:" => Wandering House Memory Loop",
    text:`
> After returning to its house : 
> - The ghost store 1 MEMORY_HOUSE   
> - The ghost begins to wander again
    `,

    isValidated:(cityNode) => cityNode.player.storyProgress.INTRO.FIRST_HOUSE_LOOP
        && cityNode.entitiesIsAtNode,

    doText: "Start a MEMORY_HOUSE Wandering !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {count:1,       waitCount:0,       id:'randomMove'},
                {count:null,    waitCount:20 * 2,  id:'goGrave'},
                {count:null,    waitCount:20 * 2,  id:'goHouse'},
                {count:null,    waitCount:0,       id:'inventoryAdd', 
                    sData:{cityLink: 'house', itemId:'MEMORY_HOUSE', count:1}},
                {count:null,    waitCount:20 * 2,       id:'randomMove'},
            ]
        });
    }
})
// -----------------



export class CitNodeHouse extends CityTileNode {
    constructor(world, cityFactory, tile, conf={}) {
        super(world, cityFactory, tile, conf)
        this.type = 'HouseNode'
        this.asset = {key: [
            "coinGold_NW#_H190_C110_S80_B80_R1",
            "coinGold_NW#_H190_C110_S80_B80_R1",
            "coinGold_NW#_H190_C110_S80_B80_R2",
            "coinGold_NW#_H190_C110_S80_B80_R2",
        ]}
        this.STEPS = [

            {
                type: "Menu",
                title: "Menu",
                isValidated: true,
            },
            STEP_ASSIGN_HOUSE,
            {
                type:"Entities",
                title: " # Entities",
                isValidated: (cityNode) => cityNode.entities.length > 0,
            },

            STEP_ENTITIE_CALL_BACK,
            STEP_ENTITIE_FIRST_HOUSE_LOOP,
            STEP_ENTITIE_HOUSE_LOOP,

            {
                type:"Inventory",
                title: " # == Inventory ===",
                isValidated: (cityNode) => cityNode.entities.length > 0,
            },
            
            
            // section_CallEntities,
            // section_RemoveBuilding,
        ]

    }
}

