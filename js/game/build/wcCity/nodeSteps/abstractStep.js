



export const abstractStep = {
    text: "", // Markdonw text
    isValidate: (cityNode) => {
        return true
    },
    undo: (cityNode, callback=_ => {}) => { 
        console.log('#UNDO#')
        cityNode.sData = null,
        cityNode.ta.doAction({func:'clearAllTemporatyItems'})
        callback(); 
    }
    // doEnter: (cityNode, callback=_ => {}) => { }
    // do: (cityNode, callback=_ => {}, param={}) => {}

}


export const SUBSTEP_ERROR = {...abstractStep, 
    title: "Error",
    text: `> ### No a Valide Step `, 
    isValidated : (cityNode) =>  {
        console.log('NO VALIDE STEP ', cityNode)
        return true
    }
}


export const SUBSTEP_WATTING = {...abstractStep, 
    text: `> ### ...Waiting `, 
    isValidated : (cityNode) =>  {
        return cityNode.sData && cityNode.sData.isWaiting
    },
}

