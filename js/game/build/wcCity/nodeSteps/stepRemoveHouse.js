import { SUBSTEP_ERROR, SUBSTEP_WATTING, abstractStep } from "./abstractStep.js";


const stepNoValide = {...abstractStep, 
    title: "Remove House",
    text: `> ### No Build `, 
    isValidated: (cityNode) => {
        return !cityNode.buildFactory
    }
}


const stepRemoveBuilding = {...abstractStep, 
    title: "Remove House",
    text: `> ### ..Remove the house`, 
    isValidated: (cityNode) => {
        return cityNode.buildFactory
    },
    doEnter: (cityNode, callback=_ => {}) => { 
    },
    undo:(cityNode, callback=_ => {}) => { 
        callback(); 
    },
    do: (cityNode, callback=_ => {}, param={}) => { 
        console.log("Remove : cityNode.buildFactory", cityNode.buildFactory)
        cityNode.buildFactory.allTileBuildingList.forEach(buildTile => {
            cityNode.ta.clearAllTile(buildTile.tile)          
        });
        cityNode.buildFactory = null
        // remove CityNode from tile
        cityNode.tile.cityNode = null
        // callback(); 
    }
}


export const section_RemoveBuilding = {
    type:"Build", 
    title: "Remove House",
    isValidated:true,
    steps: [
        SUBSTEP_WATTING,
        stepNoValide,
        stepRemoveBuilding,
        SUBSTEP_ERROR,
    ],
}

