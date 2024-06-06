import { abstractStep } from "../nodeSteps/abstractStep.js"


const SUBSTEP_WAITING = {...abstractStep, 
    text: `> ### ...Waiting `, 
    isValidated : (cityNode) =>  {
        return cityNode.sData && cityNode.sData.isWaiting
    },
}

export const valideCost = (cityNode, cost) => {
    console.log('== valideCost')
    console.log(cost.filter(c => cityNode.inventoryHave(c.itemId, c.count)))

    return cost.filter(c => cityNode.inventoryHave(c.itemId, c.count)).length == cost.length
}

const costMDTable_Conf = (conf) => { return (cityNode) => { 
        return "## Cost\n\n"
        + '| **Name** | **Q** | **I** |\n'
        + '|:-:|:-:|:-:|\n'
        + conf.cost.map(slot => {
            const inventoryCount = cityNode.inventoryIndex[slot.itemId] ? cityNode.inventoryIndex[slot.itemId].count : 0 
            return `| ${slot.itemId} | ${slot.count} | ${inventoryCount}`
        }).join('\n')
        + '\n\n\n'
}}

const MAKE_SUBSTEP_INVALIDE_COST = (conf) => {return  {...abstractStep,
    text:  (cityNode) => { 
        const MD_cost = conf.cost ? costMDTable_Conf(conf) : _ => ''
        return " ## Not enough MEMORY. \n\n" + MD_cost(cityNode)
     }, 
    
    isValidated: (cityNode) => !valideCost(cityNode, conf.cost),
    doText:"OK",
    do: (cityNode, callback=_ => {}, param={}) => {
        cityNode.homeStep()
        callback()
    },
}}


export const def_STEP_TEXT = (conf) => {

    const SUBSTEP_INVALIDE_COST = conf.cost ? [MAKE_SUBSTEP_INVALIDE_COST(conf)] : []
    const applyCost = (cityNode) => {
        if (!conf.cost) return
        conf.cost.forEach(slot => {
            cityNode.inventoryRemove(slot.itemId,slot.count)
        });
    } 

    const doObject = conf.doClick ?  {
        doText:conf.doText,
        do:(cityNode, callback=_ => {}, param={}) => {
            applyCost(cityNode)
            conf.doClick(cityNode)
            cityNode.homeStep()
            callback()
        },
    } : conf.doCall ? {
        doText:conf.doText,
        do:(cityNode, callback=_ => {}, param={}) => {
            applyCost(cityNode)
            conf.doCall(cityNode, callback)
        },
    } : {}

    
    return {
        title: conf.title,
        type:"Build", 
    
        isValidated:conf.isValidated ,
    
        steps: [
            SUBSTEP_WAITING,
            ...SUBSTEP_INVALIDE_COST,
            {...abstractStep,
                ...doObject,
                text:  (cityNode) => { 
                    const costText = conf.cost ? costMDTable_Conf(conf)(cityNode) : ''
                    const confText = typeof conf.text == 'string' ? conf.text : conf.text(cityNode)
                    return  confText + costText
                }, 
                isValidated: (cityNode) => true,
            },
        ],
    }
} 



// ----------------

export const cityNode_text_inventory = (cityNode) => { 
    const row = cityNode.inventory.map(slot => `| ${slot.itemId} | ${slot.count} |`).join('\n')
    return `
<div style="text-align:center">

| **Name** | **Q** |
|:-:|:-:|
${row}   

</div>
`
}

export const cityNode_text_player_inventory = (cityNode) => { 
    const row = cityNode.player.inventory.map(slot => `| ${slot.itemId} | ${slot.count} |`).join('\n')
    return `
<div style="text-align:center">

| **Name** | **Q** |
|:-:|:-:|
${row}   

</div>
`
}

export const cityNode_do_inventory_from_player = cityNode => {
    cityNode.player.inventory.forEach(slot => {
        cityNode.inventoryAdd(slot.itemId, slot.count)
    });
    cityNode.player.inventoryEmpty()
}

export const cityNode_do_inventory_to_player = cityNode => {
    cityNode.inventory.forEach(slot => {
        cityNode.player.inventoryAdd(slot.itemId, slot.count)
    });
    cityNode.inventoryEmpty()
}



// ----------------


const CITY_DEFAULT_PARAM =  {
    mainRoad : {
        count : 30,
        color : "#000000",
        length: 14,
        size : 5,

        alphaStep : 16,
        powerIter : 20,
        powerCost : 1,

        lvlDeviationCount: 4,
        lvlDefviationAlpha: 2,        
    },
    crossingRoad : {
        color : "#000000",
        length: 14,
        size : 6,

        alphaStep : 4,
        powerCondition :10,
        powerIter : 10,
        powerCost : -6,

        lvlDeviationCount: 2,
        lvlDefviationAlpha: 2,        
    },
    subRoad : {
        count : 0,
        color : "#000000",
        length: 14,
        size : 2,
        alphaStep : 4,
        powerCondition : 5,
        powerCost : 1,
        powerIter : 1,
        lvlDeviationCount: 2,
        lvlDefviationAlpha: 2,        
    },
    connectRoad : {
        count : 0,
        color : "#000000",
        length: 16,
        size : 1,

        alphaStep : 4,
        // betaSetp : [...Array(16).keys()].map(x => 360 / 16 * x),
        // powerCondition : 5,
        powerCost : 1,
        powerIter : 1,
        lvlDeviationCount: 0,
        lvlDefviationAlpha: 0,        
    },
}

