



export const abstractStep = {
    title: "",
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
    // do: (cityNode, param={}, callback=_ => {}) => {}

}


export const STEP_ERROR = {...abstractStep, 
    title: "Error",
    text: `> ### No a Valide Step `, 
    isValidated : (cityNode) =>  {
        console.log('NO VALIDE STEP ', cityNode)
        return true
    }
}

