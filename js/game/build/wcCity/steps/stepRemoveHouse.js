import { STEP_ERROR, abstractStep } from "./abstractStep.js";

const stepWaiting = {...abstractStep, 
    title: "Remove House",
    text: `> ### ...Waiting  `, 
    isValidated : (cityNode) =>  {
        return cityNode.sData && cityNode.sData.isWaiting
    },
}


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
    do: (cityNode, param={}, callback=_ => {}) => { 
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
        stepWaiting,
        stepNoValide,
        stepRemoveBuilding,
        STEP_ERROR,
    ],
}

