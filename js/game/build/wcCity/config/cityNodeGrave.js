
import { CityTileNode } from "../cityTileNode.js"
import { SUBSTEP_SummonEntity } from "../nodeSteps/stepSummonEntity.js"
import { def_STEP_TEXT } from "./defaultCity.js"



export const STEP_SUMMON = def_STEP_TEXT({
    title: " => Wake of the Dead",
    text:"Zzzzzz zZzzzz ",
    doText:"Wake Up !!!!",

    isValidated:(cityNode) => true
        && cityNode.entities.length < 5,

        doClick: (cityNode) => {
        SUBSTEP_SummonEntity.doEnter(cityNode)
    },
})


const STEP_ENTITIE_CALL_BACK = def_STEP_TEXT({
    title:" => Call the ghost ",
    text:`
 > - This action stop all ghost wandering
 > - When ghosts is on the grave, you can give him some order.
    `,
    isValidated:(cityNode) => true
        && cityNode.entities.length > 0 
        && !cityNode.entitiesIsAtNode,

    doText: "Brings back the ghost to the grave !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {id:'goGrave', waitCount:0, count:1},
                {id:'goGrave', waitCount:20 * 20, count:null},
            ]
        });
    }
})

const STEP_ENTITIE_GRAVE_LOOP = def_STEP_TEXT({
    title:" => Wandering Grave Memory Loop",
    text:`
> After returning to its grave : 
> - The ghost store 1 MEMORY_GRAVE   
> - The ghost begins to wander again
`,

    isValidated:(cityNode) => true
        && cityNode.entitiesIsAtNode,

    doText: "Start a MEMORY_GRAVE Wandering !",
    doClick:(cityNode) => {
        const entities = cityNode.entities
        entities.forEach(e => {
            e.clearGoal()
            e.goalList = [
                {count:1,       waitCount:0,       id:'randomMove'},
                {count:null,    waitCount:20 * 2,       id:'randomMove'},
                {count:null,    waitCount:20 * 2,  id:'goGrave'},
                {count:null,    waitCount:0,       id:'inventoryAdd', 
                    sData:{cityLink: 'grave', itemId:'MEMORY_GRAVE', count:1}},
                {count:null,    waitCount:20 * 2,       id:'randomMove'},
            ]
        });
    }
})

export class CitNodeGrave extends CityTileNode {
    constructor(world, cityFactory, tile, conf={}) {
        super(world, cityFactory, tile,  {...conf, type:'GraveNode'})
        this.asset = {key: [
            "coinGold_NW#_H130_C80_S10_B80_R1",
            "coinGold_NW#_H130_C80_S10_B80_R1",
            "coinGold_NW#_H130_C80_S10_B80_R2",
            "coinGold_NW#_H130_C80_S10_B80_R2",
        ]}
        this.STEPS = [
            {
                type: "Menu",
                title: "Menu",
                isValidated: true,
            },
            STEP_SUMMON,
            {
                type:"Entities",
                title: "Entities",
                isValidated: true,
            },
            STEP_ENTITIE_CALL_BACK,
            STEP_ENTITIE_GRAVE_LOOP,

            {
                type:"Inventory",
                title: " # === Inventory ===",
                isValidated: (cityNode) => true,
            },
            
        ]

    }
}
