import { CityEntity } from "../../entity/cityEntity.js";
import { SUBSTEP_ERROR, abstractStep } from "./abstractStep.js";

export const SUBSTEP_SummonEntity = {...abstractStep, 
    title: "Summon Entity",
    text: `> ### Summon `, 
    isValidated: (cityNode) => {
        return true
    },
    doEnter: (cityNode, callback=_ => {}) => { 

        const cf = cityNode.cityFactory 
        console.log(cityNode)
        const entity = new CityEntity(cityNode.world, cf, {})
        entity.defineCityNodeLink('grave', cityNode)
        entity.summon(cityNode.tile)

        cityNode.homeStep()
        callback()
    },
}


export const section_Summon = {
    title: "Summon Entity",
    type:"Build", 
    isValidated:true,
    steps: [
        SUBSTEP_SummonEntity,
        SUBSTEP_ERROR,
    ],
}
