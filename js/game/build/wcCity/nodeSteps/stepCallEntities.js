import { SUBSTEP_ERROR, SUBSTEP_WATTING, abstractStep } from "./abstractStep.js";

export const SUBSTEP_CallEntities = {...abstractStep, 
    title: "Call Back Entity",
    text: `> ### Call Back Entity `, 
    isValidated: (cityNode) => {
        return true
    },
    doEnter: (cityNode, callback=_ => {}) => { 
        const entities = cityNode.entities
        entities.forEach(e => {
            e.mainGoal = 'goGrave'
            e.sData = null
        });
        cityNode.homeStep()
        callback()
    },
}


export const section_CallEntities = {
    title: "Call Back Entity",
    type:"Build", 
    isValidated:true,
    steps: [
        SUBSTEP_WATTING, 
        SUBSTEP_CallEntities,
        SUBSTEP_ERROR,
    ],
}
